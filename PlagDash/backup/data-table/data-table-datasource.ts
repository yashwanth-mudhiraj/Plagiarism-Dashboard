import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { SharedService } from 'src/app/shared.service';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  assgnId : number;
  assgnName: string;
  assgnCreated: Date;
  assgnDeadline: Date;
  courseId: string;
  proId: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {assgnId:1,assgnName: "Palindrome", assgnCreated: new Date(), assgnDeadline: new Date(),courseId: "CSC201",proId:2},
  {assgnId:1,assgnName: "string compare", assgnCreated: new Date(), assgnDeadline: new Date(),courseId: "CSC201",proId:2},
  {assgnId:1,assgnName: "function overload", assgnCreated: new Date(), assgnDeadline: new Date(),courseId: "CSC201",proId:2},
  {assgnId:1,assgnName: "Palindrome", assgnCreated: new Date(), assgnDeadline: new Date(),courseId: "CSC201",proId:2}
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(res:any) {
    super();
    this.data = res
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'assgnName': return compare(a.assgnName, b.assgnName, isAsc);
        case 'assgnCreated': return compare(+a.assgnCreated, +b.assgnCreated, isAsc);
        case 'assgnDeadline': return compare(+a.assgnDeadline, +b.assgnDeadline, isAsc);
        default: return 0;
      }
    });
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
