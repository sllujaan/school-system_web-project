import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface PeriodicElement {
  id: number;
  name: string;
  age: number;
  course: string;
}


@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  
  public students = []
  public tempStudents = []
  public search
  public selectedOption = 1
  public sortOption = 1
  public nameKey = ''
  options = [
    { name: "Name", value: 1 },
    { name: "Id", value: 2 },
    { name: "Age", value: 3 },
    { name: "Course", value: 4 }
  ]
  


  public ELEMENT_DATA

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);



  editStudent = (id: number) =>{
    this.router.navigate(['/students/edit', id])
  }
  removeStudent = (id: number) =>{
    console.log("removing student with id: "+id)
    const conf = confirm("Are you sure to delete student with id: "+id+"?")
    if(conf == true){
      console.log("OK")
      this.authservice.postRequest("http://localhost:3000/students", {_id:id})
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => console.log(err)
      )
    }else{
      console.log("canceled")
    }
  }

  getStudent = (_id: number) =>{
    let student = this.students.find( ({ id }) => id === _id );
    if(student){
      return student
    }return false
  }
  
  getStds(){
    return this.students
  }

  constructor(private authservice:AuthService, private http:HttpClient, private router: Router) { }


  ngOnInit() {
    this.http.get<any>("http://localhost:3000/students").subscribe(
      res => {
        this.students = res
        this.tempStudents = res
        this.students.sort(this.compare)
        const ELEMENT_DATA: PeriodicElement[] = res;
        console.log(ELEMENT_DATA)
        this.ELEMENT_DATA = ELEMENT_DATA
      },
      err => console.log(err)
    )
    setTimeout(() => {
      console.log(this.students)
      console.log(this.tempStudents)
      console.log(this.ELEMENT_DATA)
    }, 2000);

    this.dataSource.sort = this.sort;
    console.log(this.ELEMENT_DATA)
  }

  searchFun = (event) => {
    let found = this.searchStudent(this.nameKey, this.tempStudents)
    let size = Object.keys(found).length
    if(size >= 0 && this.nameKey.length > 0){
      this.students = found
    }
    else {
      console.log("restore record")
      this.students = this.tempStudents
    }
    console.log(found)
    console.log(Object.keys(found).length)
  }
  

  searchStudent(nameKey, myArray){
    let found = []
    if(this.selectedOption == 1){
      /*for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name.toLowerCase().includes(nameKey.toLowerCase())) {
            //console.log(myArray[i])
            found.push(myArray[i])
        }
        
      }*/
      found = myArray.filter(x => x.name.toLowerCase().includes(nameKey.toLowerCase()));
      return found
    }
    else if(this.selectedOption == 2){
      found = myArray.filter(x => x.id == nameKey);
      console.log("found = ")
      console.log(found)
      return found;
    }
    else if(this.selectedOption == 3){
      found = myArray.filter(x => x.age == nameKey);
      console.log("found = ")
      console.log(found)
      return found;
    }
    else if(this.selectedOption == 4){
      found = myArray.filter(x => x.course.toLowerCase().includes(nameKey.toLowerCase()));
      console.log("found = ")
      console.log(found)
      return found;
    }
    else{
      return []
    }
    
  }

  onSelectchange(){
    console.log("onSelectchange")
    this.nameKey = ''
  }

  onSortChange(){
    console.log("onSortChange")
    this.nameKey = ''
    if(this.sortOption == 1){
      this.students.sort(this.compare)
    }
    else if(this.sortOption == 2){
      this.students.sort(this.sortAge)
    }
    else if(this.sortOption == 3){
      this.students.sort(this.sortId)
    }
    else if(this.sortOption == 4){
      this.students.sort(this.sortCourse)
    }
  }

  sortStudents(){
  }


  compare(a, b) {
    let A = a.name.toUpperCase();
    let B = b.name.toUpperCase();
    let comparison = 0;
    
    if (A >  B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;

  }

  sortAge(a, b) {
    let A = a.age
    let B = b.age
    let comparison = 0;
    
    if (A >  B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;

  }

  sortCourse(a, b) {
    let A = a.course
    let B = b.course
    let comparison = 0;
    
    if (A >  B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;

  }

  sortId(a, b) {
    let A = a.id
    let B = b.id
    let comparison = 0;
    
    if (A >  B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;

  }



}

//{id:1, name:"johnson", age:21, course:"IT"},
  //{id:2, name:"jake", age:20, course:"CS"}
/*
  else if(this.selectedOption == 4){
    found = myArray.filter(x => x.course.toLowerCase() == nameKey.toLowerCase());
    console.log("found = ")
    console.log(found)
    return found;
  }*/