import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.scss']
})
export class NewAssignmentComponent implements OnInit {
  maxDate: Date;
  minDate: Date;
  asName:any = ""
  asDead:any = ""
  DocFileName:any = "File"
  DocFilePath:any = ""
  file:any = ""
  closecall:any = ""
  formData:FormData = new FormData()

  constructor(public service:SharedService,@Inject(MAT_DIALOG_DATA) public data: any, public datepipe:DatePipe) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(new Date().setMonth(new Date().getMonth()+5));

   }

  stuList:any = ""
  emailList:any=""

  ngOnInit(): void {
    this.getStudentList()
  }

  getStudentList(){
    this.service.getStuList().subscribe(data=>{
      this.stuList = data.filter((x:any)=> x.courseId == this.data.selectedCourse.courseId)
      this.emailList = this.stuList.map((x:any) => x.email )
    })
  }



  createAssignment() {
    if(this.stuList==0){
      alert("Please register students in this course before uploading assignments")
    }
    else{
      var val = {
        assgnName : this.asName,
        assgnCreated : this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        assgnDeadline : this.datepipe.transform(this.asDead, 'yyyy-MM-dd'),
        proId : this.data.selectedCourse.professorId,
        courseId : this.data.selectedCourse.courseId,
        DocFileName : this.DocFileName,
        avgSim: 0.0,
        year: new Date().getFullYear()
      }
      this.service.addAssgn(val).subscribe(res=>{
        var updatedAssgn:any = res

        this.service.UploadFile(this.formData).subscribe((data:any)=> {

          var updateDocName = {
            assgnId : updatedAssgn.assgnId,
            assgnName : this.asName,
            assgnCreated : this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
            assgnDeadline : this.datepipe.transform(this.asDead, 'yyyy-MM-dd'),
            proId : this.data.selectedCourse.professorId,
            courseId : this.data.selectedCourse.courseId,
            DocFileName : data.toString(),
            avgSim: 0.0,
            year: new Date().getFullYear()
          }

          this.service.updateAssgn(updateDocName).subscribe(()=>{
          this.service.sendClickEvent("True")

            this.DocFileName = data.toString();
            this.DocFilePath = this.service.FileUrl + "/" + this.DocFileName

            var val = {
              params : {
                fileName : this.DocFileName,
                emailList : this.emailList
              }
            }
            this.service.sendEmail(val).subscribe(data=>{
              console.log(data)
            })
          })

        })
      })
    }
  }

  uploadFile(event:any){
    var file=event.target.files[0]
    this.formData.append('uploadedFile',file,file.name)
  }

}
