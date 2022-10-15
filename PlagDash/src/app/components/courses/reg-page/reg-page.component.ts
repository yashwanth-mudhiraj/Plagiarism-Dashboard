import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { DatePipe } from '@angular/common';
import { CoursesComponent } from '../courses.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

export interface Course {
  courseId: string;
}

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss']
})
export class RegPageComponent implements OnInit {

  constructor(private service:SharedService,public datepipe: DatePipe, public coursecomp: CoursesComponent, public auth:AuthService) { }

  @Input() courseList:any = [];

  cID:string = ""
  cName:string = ""
  pID:string = ""
  pName:string = ""
  updateFlag:boolean = false
  cDate:any = ""
  authObj:any = ""
  proData:any = ""

  myControl = new FormControl<string | Course>('');
  options: Course[] = [];
  filteredOptions: Observable<Course[]> = new Observable;


  ngOnInit(): void {
    this.auth.user$.subscribe(
      profile => {
        this.authObj = profile;
      })

      this.service.getProfList().subscribe(data=>{
        this.proData = data.filter(s=>s.email == this.authObj.email)[0]
        this.pID = this.proData.proId
        this.pName =  this.proData.proFName + " " + this.proData.proLName
      })


    this.populateOptions()
  }

  populateOptions() {
    this.options = this.courseList;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.courseId;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  private _filter(name: string): Course[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.courseId.toLowerCase().includes(filterValue));
  }


  courseReg() {
    var val = {
      courseId : this.cID,
      courseName : this.cName,
      professorId : parseInt(this.pID),
      professorName : this.pName,
      courseCreateDate : this.datepipe.transform(new Date(), 'yyyy-MM-dd')
    }
    this.service.addCourse(val).subscribe(res=>{
      alert(res.toString());
      this.clear()
      this.coursecomp.refreshCourseList()
    })
  }

  courseUpdate() {
    this.updateFlag = false
    var val = {
      courseId : this.cID,
      courseName : this.cName,
      professorId : parseInt(this.pID),
      professorName : this.pName,
      courseCreateDate : this.cDate
    }
    this.service.updateCourse(val).subscribe(res=>{
      alert(res.toString());
      this.clear()
      this.coursecomp.refreshCourseList()
    })
  }

  clear() {
    this.updateFlag = false
    this.cID = ""
    this.cName = ""
    this.pID = ""
    this.pName = ""
  }

  courseSelect(course:any, event:any) {
    if(event.isUserInput){
      // this.cID = course.courseId;
      this.updateFlag = true
      this.cName = course.courseName;
      this.pID = course.professorId;
      this.pName = course.professorName;
      this.cDate = course.courseCreateDate;
    }

  }

}
