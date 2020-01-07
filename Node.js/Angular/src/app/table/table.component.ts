import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddStudentComponent } from '../add-student/add-student.component';

export interface PeriodicElement {
  id: number;
  name: string;
  fatherName: string;
  age: number;
  course: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  constructor(private dialog: MatDialog, private router:Router, private http: HttpClient) { }

  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ['id', 'name', 'fatherName', 'age', 'course', 'modify']

  ngOnInit() {
    this.http.get<any>("http://localhost:3000/students").subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
      },
      err => console.log(err)
    )
    this.countDown((res)=>{
      if(res) console.log(res)
    })
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editStudent = (id: number) =>{
    this.router.navigate(['/students/edit', id])
  }

  countDown(callback){
    this.sec--
    console.log(this.sec)
    if(this.sec < 1 && this.min > 0){
      this.min--
      this.sec = 10
    }
    
    if(this.min < 1 && this.sec < 1){
      let res = "I am the respons"
      callback(res);
      return
    }
    setTimeout(() => {
      this.countDown(callback)
    }, 100);
  }

  public time = 10
  public min = 10
  public sec = 10
  public dialogConfig = new MatDialogConfig()

  onCreate(){
    //this.dialogConfig
    this.dialogConfig.width = "70%"
    this.dialogConfig.height = "90%"
    console.log(window.innerHeight)
    console.log(window.innerWidth)
    this.dialog.open(AddStudentComponent, this.dialogConfig)
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth)
    if(event.target.innerWidth < 700){
      console.log("width is less than 700")
      this.dialogConfig.width = "100%"
    }
  }

}
