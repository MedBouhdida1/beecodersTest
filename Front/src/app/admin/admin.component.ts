import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../_service/service.service';
import { course } from '../Course.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {


  lstCourse: any[] = []
  course1 = new course()
  course2 = new course()

  userFile: any
  message?: String
  imagePath: any
  imgURL: any

  @ViewChild('Add') AddModal!: ElementRef;


  @ViewChild('Modif') ModifModal!: ElementRef;

  @ViewChild('myForm') myForm?: NgForm;


  @ViewChild('formModif') FormModif?: NgForm;



  constructor(
    private service: Service
  ) {

  }


  getCourseById(id: number) {
    this.service.getCourseById(id).subscribe((data: any) => {
      console.log(data)
      this.course1 = data
    })

  }
  ModifCourse() {

    this.service.updateCourse(this.course1.id!, this.course1).subscribe((data: any) => {
      this.getCourses();

    })

    this.ModifModal.nativeElement.click();



  }


  addCourse() {
    console.log(this.course2)
    this.service.addCourse(this.course2).subscribe(res => {
      console.log(res)
      this.getCourses()
      this.AddModal.nativeElement.click();
      this.myForm?.resetForm();
    })
  }

  deleteCourse(id: number) {
    this.service.deleteCourse(id).subscribe((data: any) => {

      this.getCourses()
    })
  }


  getCourses() {
    this.service.getCourses().subscribe((data: any) => {
      console.log(data);
      this.lstCourse = data;
    })
  }


  onSelectFile(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        console.log(this.message)
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        this.course2.image = this.imgURL
        this.course1.image = this.imgURL


      };
    }
  }


  ngOnInit(): void {

    this.getCourses()
  }

}
