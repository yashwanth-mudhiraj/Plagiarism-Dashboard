import { AfterViewInit, Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  @Input()
  selectedCourse : any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['assgnName', 'assgnCreated', 'assgnDeadline']

  constructor(public service:SharedService) {
    this.dataSource = new DataTableDataSource([]);
    console.log(this.selectedCourse)
  }

  result:any=""

  ngOnChanges(): void {
    this.dataSource = new DataTableDataSource([
      {assgnId:1,assgnName: "Palindrome", assgnCreated: new Date(), assgnDeadline: new Date(),courseId: "CSC201",proId:2},
      {assgnId:1,assgnName: "string compare", assgnCreated: new Date(), assgnDeadline: new Date(),courseId: "CSC201",proId:2},
      {assgnId:1,assgnName: "function overload", assgnCreated: new Date(), assgnDeadline: new Date(),courseId: "CSC201",proId:2},
      {assgnId:1,assgnName: "Palindrome", assgnCreated: new Date(), assgnDeadline: new Date(),courseId: "CSC201",proId:2}
    ]);

    this.service.getAssgnList().subscribe(res => {
      this.result = this.selectedCourse ? res.filter(asgn=>asgn.courseId == this.selectedCourse.courseId) : []
      this.dataSource = new DataTableDataSource(this.result);
    })
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
