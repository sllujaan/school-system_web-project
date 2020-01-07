import { Component, OnInit } from '@angular/core';
import { ViewStudentsComponent } from '../view-students/view-students.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService, private fb:FormBuilder, private http:HttpClient, private route:ActivatedRoute, private students:ViewStudentsComponent) { }
  public id: number
  public student
  public studentForm

  dispStudent(id: number){
    console.log("id from dispStudent "+id)
    this.student = this.students.getStudent(Number(id))
  }
  ngOnInit() {

    this.studentForm = this.fb.group({
      id: [Number, Validators.required],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      fatherName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      age: [20, [Validators.required, Validators.min(15), Validators.max(50)]],
      course: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    })



    this.id = this.route.snapshot.params.id
    this.dispStudent(this.id)
    this.http.get<any>(`http://localhost:3000/students/edit/${this.id}`).subscribe(
      res => {
        this.student = res[0]
        this.studentForm.get("id").setValue(`${this.student.id}`);
        this.studentForm.get("name").setValue(`${this.student.name}`);
        this.studentForm.get("fatherName").setValue(`${this.student.fatherName}`);
        this.studentForm.get("age").setValue(`${this.student.age}`);
        this.studentForm.get("course").setValue(`${this.student.course}`);
      },
      err => console.log(err)
    )
    setTimeout(() => {
      console.log(this.student)
    }, 1000);
    
  }

  submit(){
    console.log(this.studentForm.value)
    this.authService.postRequest(`http://localhost:3000/students/edit/${this.id}`, this.studentForm.value)
    .subscribe(
      res => {
          console.log(res)
          this.router.navigate(['/students'])
      },
      err => console.log(err)
    )
  }

}
