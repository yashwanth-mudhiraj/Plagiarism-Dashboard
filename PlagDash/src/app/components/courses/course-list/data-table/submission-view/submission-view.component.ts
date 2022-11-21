import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-submission-view',
  templateUrl: './submission-view.component.html',
  styleUrls: ['./submission-view.component.scss']
})
export class SubmissionViewComponent implements OnInit {

  panelOpenState = false;
  submissions:any = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public service: SharedService) { }

  ngOnInit(): void {
    this.getSubmissionData()
  }

  getSubmissionData(){
    var val = {
      params : {
        fileNames : ["./Files/Submissions" + "/" +this.data.selectedAssgn.proId+"/" +this.data.selectedAssgn.courseId + "/" + this.data.selectedAssgn.assgnName]
      }
    }
    this.service.getData(val).subscribe(data=>{
      console.log(data)
      this.submissions = data
      this.submissions.scored.forEach((res:any) => {
        res.pair.leftFile.path = res.pair.leftFile.path.split("/").pop()
        res.pair.rightFile.path = res.pair.rightFile.path.split("/").pop()
      });
    })
  }

}
