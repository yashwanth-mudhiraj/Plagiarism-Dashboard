import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private service:SharedService,public auth:AuthService,private router: Router) { }

  newCourse:boolean = false
  courseList:any = []
  selectedCourse:any=""
  pID:number=0
  proData:any = ""

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile:any) => {
        this.service.getProfList().subscribe(data=>{
          this.proData = data.filter(s=>s.email == profile.email)[0]
          if(this.proData){
            this.pID = this.proData.proId
            this.refreshCourseList()
          }
          else{
            alert("Please update your profile, before adding courses");
            this.router.navigate(['']);
          }

        })
      })


  }

  regFlag(): void {
    this.newCourse = true
  }



  refreshCourseList() {
    this.service.getCourseList().subscribe(data=>{
      this.courseList=data.filter(s=>s.professorId == this.proData.proId);
      this.courseButton(this.courseList[0])
    })
  }

  courseButton(course:any){
    this.newCourse = false
    this.selectedCourse = course ? course : ""
  }




}
