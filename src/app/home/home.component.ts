import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs";
import { database } from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  selectedYear:any = -1
  selectedBranch:any = -1
  usnNo="000"
  error : boolean = false;
  arr : any;
  years = ["15","16","17","18"]
  branches = ["AEROSPACE",
  "BIOTECHNOLOGY",
  "INFORMATION SCIENCE AND",
  "CIVIL",
  "ELECTRICAL AND ELECTRONICS",
  "ELECTRONICS AND COMMUNICATION",
  "ELECTRONICS AND INSTRUMENTATION",
  "COMPUTER SCIENCE AND",
  "INDUSTRIAL AND MANAGEMENT",
  "TELECOMMUNICATION	",
  "CHEMICAL",
  "MECHANICAL",]
  dbPath:string;
  courses:any[];
  studentDetails:any[];
  constructor(private database:AngularFireDatabase ,
    public router : Router ) {}
  
  ngOnInit() {}
  submit(){
    if(this.selectedYear==-1 || this.selectedBranch==-1 || this.usnNo.length != 3)
    {
      this.error = true;
    }
    else
    {
      this.error=false;
      this.getPath();
      //Here data is being fetched properly. Issue is, this is an Async call. So we have to find a way to
      //wait until call is finished.
      this.database.list(this.dbPath).snapshotChanges().subscribe(data =>
        {
          this.studentDetails=data;
          this.studentDetails.forEach(detail =>
            {
              console.log(detail.key+":"+detail.payload.val());
            });
        });
    }      
  }
  getPath()
  {
    var semester:string;
    var branchCode:string;
    switch(this.selectedYear)
    {
      //Semesters should be changed to 8 6 4 2 after uploading new dataset
      case "15":
        semester="Semester 6";
        break;
      case "16":
        semester="Semester 4";
        break;
      case "17":
        semester="Semester 2";
        break;
      case "18":
        semester="Semester 1";
        break;
      default:
        console.log("Invalid Semester");
        break;
    }
    switch(this.selectedBranch)
    {
      case "AEROSPACE":
        branchCode="AS";
        break;
      case "BIOTECHNOLOGY":
        branchCode="BT";
        break;
      case "CHEMICAL":
        branchCode="CH";
        break;
      case "INFORMATION SCIENCE AND":
        branchCode="IS";
        break;
      case "CIVIL":
       branchCode="CV";
       break;
      case "ELECTRICAL AND ELECTRONICS":
       branchCode="EE";
       break;
      case "ELECTRONICS AND COMMUNICATION":
        branchCode="EC";
        break;
      case "ELECTRONICS AND INSTRUMENTATION":
        branchCode="EI";
         break;
      case "COMPUTER SCIENCE AND":
        branchCode="CS";
        break;
      case "INDUSTRIAL AND MANAGEMENT":
       branchCode="IM";
       break;
      case "TELECOMMUNICATION":
        branchCode="TE";
        break;
      case "MECHANICAL":
        branchCode="ME";
        break;
                                
      default:
        console.log("Invalid branch");
        break;
    }
    
    this.dbPath="/"+semester+"/"+this.selectedBranch+"/"+"1RV"+this.selectedYear+branchCode+this.usnNo;
  }
}
