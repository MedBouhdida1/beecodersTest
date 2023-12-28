import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { course } from '../Course.model';

@Injectable({
  providedIn: 'root'
})
export class Service {


  baseUrl = "http://localhost:8080/"

  constructor(
    private http: HttpClient
  ) { }



  //getCourses
  getCourses() {
    return this.http.get(this.baseUrl + "courses");
  }

  //addCourse
  addCourse(course: course) {
    return this.http.post(this.baseUrl + "courses", course);
  }

  //deleteCourse
  deleteCourse(id: number) {
    return this.http.delete(this.baseUrl + "courses/" + id);
  }

  //updateCourse
  updateCourse(id: number, course: course) {
    return this.http.put(this.baseUrl + "courses/" + id, course);
  }


  //getCourseById
  getCourseById(id: number) {
    return this.http.get(this.baseUrl + "courses/" + id);
  }
}
