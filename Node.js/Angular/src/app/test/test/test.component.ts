import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-test',
  template: `
  <div class="container" >
    <h1>Hello {{ name }}</h1>
    <form FormGroup="myForm"  >
      <small ngClass="err" *ngIf="isLen()" >name must be of 5 chars</small>
      <div [class.has-error]="isLen()">
      <input FormControlName="userName" class="form-control" [required]="true" #myInput class="form-control">
      <button (click)="clickEv($event)"  type="submit" class="btn btn-primary">Submit</button>
    </div>
      </form>
  <div class="err" >{{myForm.value | json}}</div>
    `,
  styles: [`
    .err{
      color: red;
    }
  `]
})
export class TestComponent implements OnInit {
  public name = 'johnson';
  public colors = {
    errCol:'red',
    sucCol:'green'
  };
  
  clickEv(event){
    console.log(event);
  }
  onSubmit(){
    console.log('you sub');
  }
  
  clickMe = (value = this.name) => {
    console.log(value);
    console.log(this.name.length);
  }
  isLen(){
    if(this.name.length < 5){
      return true;
    }return false;
  }


  myForm: FormGroup;
  constructor(private fb: FormBuilder) {
 }
  ngOnInit() {
    this.myForm = this.fb.group({
      userName: ['jake']
    })
  }

}
