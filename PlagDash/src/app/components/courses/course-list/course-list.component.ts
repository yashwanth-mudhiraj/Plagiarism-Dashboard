import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewAssignmentComponent } from './new-assignment/new-assignment.component';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {


  constructor(public dialog: MatDialog,public service: SharedService) { }
  @Input()
  selectedCourse : any;

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewAssignmentComponent,{
      data : {
      selectedCourse : this.selectedCourse,
    }
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


