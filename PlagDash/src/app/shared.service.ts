import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})

export class SharedService {

  readonly APIUrl = "http://127.0.0.1:8000/"
  readonly FileUrl = "http://127.0.0.1:8000/media"
  readonly DolosUrl = "http://127.0.0.1:3000/"

  constructor(private http: HttpClient) {}

  private subject = new Subject < any > ();

  sendClickEvent(val: any) {
    this.subject.next(val);
  }

  getCickEvent(): Observable < any > {
    return this.subject.asObservable();
  }

  // ---------------------------------------------------------------- Course Details
  getCourseList(): Observable < any[] > {
    return this.http.get < any[] > (this.APIUrl + 'courseReg/')
  }

  addCourse(val: any) {
    return this.http.post(this.APIUrl + 'courseReg/', val)
  }

  updateCourse(val: any) {
    return this.http.put(this.APIUrl + 'courseReg/', val)
  }

  deleteCourse(val: any) {
    return this.http.delete(this.APIUrl + 'courseReg/', val)
  }

  // --------------------------------------------------------------- Professor Details
  getProfList(): Observable < any[] > {
    return this.http.get < any[] > (this.APIUrl + 'profDetails/')
  }

  addProf(val: any) {
    return this.http.post(this.APIUrl + 'profDetails/', val)
  }

  updateProf(val: any) {
    return this.http.put(this.APIUrl + 'profDetails/', val)
  }

  deleteProf(val: any) {
    return this.http.delete(this.APIUrl + 'profDetails/', val)
  }

  // --------------------------------------------------------------- Student Details
  getStuList(): Observable < any[] > {
    return this.http.get < any[] > (this.APIUrl + 'stuDetails/')
  }

  addStu(val: any) {
    return this.http.post(this.APIUrl + 'stuDetails/', val)
  }

  updateStu(val: any) {
    return this.http.put(this.APIUrl + 'stuDetails/', val)
  }

  deleteStu(val: any) {
    return this.http.delete(this.APIUrl + 'stuDetails/', val)
  }

  // --------------------------------------------------------------- Assignment Details
  getAssgnList(): Observable < any[] > {
    return this.http.get < any[] > (this.APIUrl + 'assignments/')
  }

  addAssgn(val: any) {
    return this.http.post(this.APIUrl + 'assignments/', val)
  }

  updateAssgn(val: any) {
    return this.http.put(this.APIUrl + 'assignments/', val)
  }

  deleteAssgn(val: any) {
    return this.http.delete(this.APIUrl + 'assignments/', val)
  }

  UploadFile(val: any) {
    return this.http.post(this.APIUrl + 'SaveFile/', val)
  }


  // Getting the similarity score of assignments under a particular course
  getData(val: any) {
    return this.http.get(this.DolosUrl + 'getData/', val)
  }

  // Sending email after assignment upload
  sendEmail(val: any){
    return this.http.get(this.DolosUrl + 'sendEmail/', val)
  }


}
