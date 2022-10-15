import { AfterViewInit, Component, ViewChild, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { AssgnViewComponent } from './assgn-view/assgn-view.component';
import { Subscription } from 'rxjs';
import { SubmissionViewComponent } from './submission-view/submission-view.component';

export interface AssgnData {
  assgnId : number;
  assgnName: string;
  assgnCreated: Date;
  assgnDeadline: Date;
  courseId: string;
  proId: number;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit, OnChanges  {
  ELEMENT_DATA : AssgnData[] = [];
  displayedColumns: string[] = ['assgnName', 'assgnCreated', 'assgnDeadline', 'submissions'];
  dataSource = new MatTableDataSource<AssgnData>(this.ELEMENT_DATA);

  clickEventSubscription:Subscription | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  @Input()
  selectedCourse : any;

  result:any;

  constructor(public date:DatePipe, public service:SharedService,public dialog: MatDialog) {
    this.clickEventSubscription = this.service.getCickEvent().subscribe(()=>{
      this.getAsnList();
    })
  }

  ngOnInit(): void {
    this.getAsnList();
  }

  ngOnChanges(): void {
    this.getAsnList();
  }



  public getAsnList(){
    this.service.getAssgnList().subscribe(res => {
      this.result = this.selectedCourse ? res.filter(asgn=>asgn.courseId == this.selectedCourse.courseId) : []
      this.dataSource.data = this.result as AssgnData[];
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAssgnDialog(row:any) {
    this.getAsnList();
    const dialogRef = this.dialog.open(AssgnViewComponent,{
      data : {
      selectedAssgn : row,
    }
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSubDialog(row:any){
    const dialogRef = this.dialog.open(SubmissionViewComponent,{
      data : {
      selectedAssgn : row,
    }
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


