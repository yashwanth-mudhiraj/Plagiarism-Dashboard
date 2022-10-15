import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SharedService } from 'src/app/shared.service';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';

export interface Student {
  stuId: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  maxDate: Date;
  minDate: Date;

  constructor(private service:SharedService,public auth:AuthService,public datepipe: DatePipe) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date();
  }

  pID:string = ""
  pFName:any = ""
  pLName:any = ""
  pDept:any = ""
  simThreshold:any = 0
  dateJoined:any = ""
  proFlag:boolean = false
  authObj:any = ""
  courseList:any = ""
  stuList:any = ""
  proData:any = ""
  stuId:any = ""
  stuFName:any = ""
  stuLName:any = ""
  courseId:any = ""
  stuEmail:any = ""

  email:any = new FormControl('', [Validators.required, Validators.email]);

  myControl = new FormControl<string | Student>('');
  options: Student[] = [];
  filteredOptions: Observable<Student[]> = new Observable;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  ngOnInit(): void {
    this.auth.user$.subscribe(
      profile => {
        this.authObj = profile;
      })

    this.service.getProfList().subscribe(data=>{
      this.proData = data.filter(s=>s.email == this.authObj.email)[0]
      this.pID = this.proData.proId ? this.proData.proId : 0
      this.pFName = this.proData.proFName
      this.pLName = this.proData.proLName
      this.pDept = this.proData.dept
      this.dateJoined = this.proData.yearJoin
      this.simThreshold = this.proData.simThreshold
    })

    this.service.getCourseList().subscribe(data=>{
      this.courseList=data.filter(s=>s.professorId == this.proData.proId);
    })

    this.service.getStuList().subscribe(data=>{
      this.stuList = data
      this.populateOptions()
    })
  }

  editProf(){
    this.proFlag = true
  }

  updateProf(){
    this.proFlag = false
  if(parseInt(this.pID) != this.proData.proId){
      this.pID = this.proData.proId
      alert("Professsor Id cannot be updated")
    }
    else{
    var val = {
      proId : parseInt(this.pID),
      proFName : this.pFName,
      proLName : this.pLName,
      dept : this.pDept,
      yearJoin : this.datepipe.transform(this.dateJoined, 'yyyy-MM-dd'),
      email : this.authObj.email,
      simThreshold: this.simThreshold
    }
    if(this.proData){
      this.service.updateProf(val).subscribe(res=>{
        alert(res.toString());
      })
      this.ngOnInit();
    }

    else {
      this.service.addProf(val).subscribe(res=>{
        alert(res.toString());
      })
      this.ngOnInit();
    }

    }

  }

  saveStud(){
    var student = this.stuList.find((x:any)=> (x.stuId == parseInt(this.stuId)) && x.courseId == this.courseId)

    if(student){
      // alert(this.stuFName + "  is already registered in "+this.courseId);
      var val = {
        index: student.index,
        stuId : parseInt(this.stuId),
        stuFName : this.stuFName,
        stuLName : this.stuLName,
        courseId : this.courseId,
        yearJoin : this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        email : this.stuEmail
      }
      this.service.updateStu(val).subscribe(res=>{
        alert(res.toString());
        this.clearStu();
        this.ngOnInit()
      })
    }
    else{
      var val2 = {
        stuId : parseInt(this.stuId),
        stuFName : this.stuFName,
        stuLName : this.stuLName,
        courseId : this.courseId,
        yearJoin : this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        email : this.stuEmail
      }
      this.service.addStu(val2).subscribe(res=>{
        alert(res.toString());
        this.clearStu();
        this.ngOnInit()

      })
    }
  }



  clearStu(){
    this.stuId = 0
    this.stuFName = ""
    this.stuLName = ""
    this.stuEmail = ""
  }



  populateOptions() {
    // console.log([...new Set(this.stuList)])
    let opt:any=[]
    this.stuList.forEach((x:any)=>{
      if(!(opt.find((y:any)=>y.stuId==x.stuId))){
        opt.push(x)
      }

    })
    this.options = opt;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.stuId;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  private _filter(name: string): Student[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.stuId.toString().toLowerCase().includes(filterValue));
  }

  studentSelect(stuObj:any,event:any) {
    if(event.isUserInput){
      this.stuId = stuObj.stuId
      this.stuFName = stuObj.stuFName
      this.stuLName = stuObj.stuLName
      this.courseId = stuObj.courseId
      this.stuEmail = stuObj.email
    }
  }




}
