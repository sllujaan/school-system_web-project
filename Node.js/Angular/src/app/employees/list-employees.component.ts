import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] = [
     {
        id: 1,
        name: 'johnson',
        email: 'john@gmail.com',
        gender: 'male',
        photoPath: 'assets/images/image1.jpg'
     },
     {
      id: 2,
      name: 'jake',
      email: 'jake@gmail.com',
      gender: 'male',
      photoPath: 'assets/images/image1.jpg'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
