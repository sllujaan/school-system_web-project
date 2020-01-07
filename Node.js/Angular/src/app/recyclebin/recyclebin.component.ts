import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recyclebin',
  templateUrl: './recyclebin.component.html',
  styleUrls: ['./recyclebin.component.css']
})
export class RecyclebinComponent implements OnInit {

  public students = []
  

  deleteStudent = (id: number) =>{
    console.log("delete Parmanantly")
  }
  restoreStudent = (id: number) =>{
    console.log("restore"+id)
    this.authService.postRequest("http://localhost:3000/students/recyclebin", {_id:id})
    .subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }

  getStudent = (_id: number) =>{
    let student = this.students.find( ({ id }) => id === _id );
    if(student){
      return student
    }return false
  }

  constructor(private authService:AuthService, private http:HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<any>("http://localhost:3000/students/recyclebin").subscribe(
      res => this.students = res,
      err => console.log(err)
    )
    setTimeout(() => {
      console.log(this.students)
    }, 2000);
  }
}
