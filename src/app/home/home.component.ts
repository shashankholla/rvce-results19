import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { database } from "firebase";
import { SharedService } from "../shared-service";
import { async } from "q";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  selectedIndex: number = 0;
  selectedYear: any = -1;
  selectedBranch: any = -1;
  usnNo = "000";
  error: boolean = false;
  arr: any;
  years = ["15", "16", "17", "18"];

  branches = [
    "AEROSPACE",
    "BIOTECHNOLOGY",
    "INFORMATION SCIENCE AND",
    "CIVIL",
    "ELECTRICAL AND ELECTRONICS",
    "ELECTRONICS AND COMMUNICATION",
    "ELECTRONICS AND INSTRUMENTATION",
    "COMPUTER SCIENCE AND",
    "INDUSTRIAL AND MANAGEMENT",
    "TELECOMMUNICATION",
    "CHEMICAL",
    "MECHANICAL"
  ];
  dbPath: string;
  averagePath: string;
  gpas: string;
  courses: any[];
  studentDetails: any[];
  branchAverage: any;
  loading: boolean = false;
  constructor(
    private database: AngularFireDatabase,
    public router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.sharedService.currentData.subscribe(
      message => (this.studentDetails = message)
    );
  }
  submit() {
    console.log("Submitted");
    this.loading = true;
    if (
      this.selectedYear == -1 ||
      this.selectedBranch == -1 ||
      this.usnNo.length != 3
    ) {
      this.error = true;
      this.loading = false;
    } else {
      this.error = false;
      this.getPath();
      console.log(this.dbPath);
      this.database
        .list(this.dbPath)
        .snapshotChanges()
        .subscribe(async data => {
          await this.updateStudentDetails(data);

          if (this.studentDetails.length == 0) {
            //console.log("Empty");
            this.error = true;
            this.loading = false;
            this.selectedIndex = 1;
            return;
          }
          await this.database
            .list(this.gpas)
            .snapshotChanges()
            .subscribe(async data => {
              await this.updateGPAS(data);
              await this.database
                .list(this.averagePath)
                .snapshotChanges()
                .subscribe(async data => {
                  await this.updateAverageDetails(data);

                  ////console.log("AV")
                  ////console.log(this.branchAverage)
                });

              await this.router.navigate(["result"]);
              // ////console.log("GPAS")
              // ////console.log(data)
            });

          //This callback function is only exceuted once async data fetching is done
        });

      ////console.log("Got student details")
    }
  }
  updateGPAS(data) {
    this.sharedService.changeGPA(data);
  }

  updateStudentDetails(data) {
    this.sharedService.changeM(data);
  }

  updateAverageDetails(data) {
    this.sharedService.changeAvg(data);
  }
  getPath() {
    var semester: string="Semester";
    var semesterNumber:number;
    var branchCode: string;
    switch (this.selectedYear) {
      case "15":
        semesterNumber=8;
        break;
      case "16":
        semesterNumber=6;
        break;
      case "17":
        semesterNumber=4;
        break;
      case "18":
        semesterNumber=2;
        break;
    }
    switch (this.selectedBranch) {
      case "AEROSPACE":
        branchCode = "AS";
        break;
      case "BIOTECHNOLOGY":
        branchCode = "BT";
        break;
      case "CHEMICAL":
        branchCode = "CH";
        break;
      case "INFORMATION SCIENCE AND":
        branchCode = "IS";
        break;
      case "CIVIL":
        branchCode = "CV";
        break;
      case "ELECTRICAL AND ELECTRONICS":
        branchCode = "EE";
        break;
      case "ELECTRONICS AND COMMUNICATION":
        branchCode = "EC";
        break;
      case "ELECTRONICS AND INSTRUMENTATION":
        branchCode = "EI";
        break;
      case "COMPUTER SCIENCE AND":
        branchCode = "CS";
        break;
      case "INDUSTRIAL AND MANAGEMENT":
        branchCode = "IM";
        break;
      case "TELECOMMUNICATION":
        branchCode = "TE";
        break;
      case "MECHANICAL":
        branchCode = "ME";
        break;
    }
    
    var number:number=Number(this.usnNo);
    if(number>=400)
      semesterNumber=semesterNumber+2;
      semester=semester+semesterNumber;

    this.dbPath =
      "/data/" +
      semester +
      "/" +
      this.selectedBranch +
      "/" +
      "1RV" +
      this.selectedYear +
      branchCode +
      this.usnNo;
    this.averagePath =
      "/data/" + semester + "/" + this.selectedBranch + "/" + "AVERAGE";

    this.gpas = "/gpas/" + semester + "/" + this.selectedBranch;
    console.log(this.dbPath);
  }
}
