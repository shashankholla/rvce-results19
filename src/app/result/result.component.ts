import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from '../shared-service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

import { FlexLayoutModule } from "@angular/flex-layout";
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  studentDetails:any[];
  averageSGPA :any;
  gpaData: any[];
  gpaNumData: any[];
  subs:any[];
  name:string;
  avg:string;
  rank:string;
  sgpa:string;
  cgpa:string;
  canvas:any;
  constructor(public router : Router, private sharedService: SharedService,private elementRef: ElementRef) { }
 
  ngOnInit() {
    this.subs = []
    this.gpaNumData =[];
    this.sharedService.currentData.subscribe(message => this.studentDetails = message);
    this.sharedService.gpaDatas.subscribe(message => this.gpaData = message);
    this.sharedService.avgData.subscribe(message => this.averageSGPA = ((parseFloat(message)).toPrecision(2)).toString());
    
    
    
    this.studentDetails.forEach(detail =>
      {

        switch(detail.key)
        {
          case "Name":
            {
              this.name = detail.payload.val()
              break;
            }
            case "CGPA":
            {
              this.cgpa = parseFloat(detail.payload.val()).toPrecision(3).toString()
              break;
            }
            case "SGPA":
            {
              this.sgpa = parseFloat(detail.payload.val()).toPrecision(3).toString()
              break;
            }
            case "Rank":
            {
              this.rank = detail.payload.val()
              break;
            }
            default :
            {
              this.subs.push([detail.key,detail.payload.val()])
            }
            
        }
      
      
      });

      
      
      this.gpaData.forEach(element =>
        {
          let x = parseFloat(element.payload.val()).toPrecision(3)
          this.gpaNumData.push(x);
        });
       this.gpaData = this.gpaData.sort((a,b) => (a>b) ? 1 : -1)

      
      var gpaS = {};   
      this.gpaNumData.forEach(x => {
        
        if(!(x in gpaS))
        {
          gpaS[x] = 1;
        }
        else {
          gpaS[x] = gpaS[x] + 1;
        }

      })

      
      let k = Object.keys(gpaS);
      k = k.sort()
      let m = []
      k.forEach(element => {
       m.push([gpaS[element]] )
      });





      
      this.canvas = new Chart('canvas', {
        type: 'bar',
        data: {
            labels: k,
            datasets: [{
                label: '# of students',
                data: m,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                hoverBackgroundColor: 'rgba(0, 255, 0, 0.8)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

  }

}
