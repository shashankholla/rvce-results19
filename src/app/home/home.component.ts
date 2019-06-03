import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/firebase-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  selectedYear = -1
  selectedBranch = -1
  usnNo="000"
  error : boolean = false;
  arr : any;
  years = ["15","16","17","18"]
  branches = ["BIOTECHNOLOGY	",
  "INFORMATION SCIENCE AND	",
  "CIVIL",
  "ELECTRICAL AND ELECTRONICS",
  "ELECTRONICS AND COMMUNICATION",
  "ELECTRONICS AND INSTRUMENTATION",
  "COMPUTER SCIENCE AND",
  "INDUSTRIAL AND MANAGEMENT	",
  "TELECOMMUNICATION	",
  "CHEMICAL	",
  "MECHANICAL",]
  constructor(public firebaseService : FirebaseService ,
    public router : Router ) { }
  
  ngOnInit() {
    
    
    
  }
  submit(){
    console.log(this.selectedYear, this.selectedBranch,this.usnNo.length);
    if(this.selectedYear==-1 || this.selectedBranch==-1 || this.usnNo.length != 3)
    {
      this.error = true;

    } else{
      
      this.error = false;
      this.firebaseService.getUsn().subscribe({
      data => console.log(data)
      }

      )
      
      
    }  
  }
   
}
