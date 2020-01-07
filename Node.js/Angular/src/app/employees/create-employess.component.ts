import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-create-employess',
  templateUrl: './create-employess.component.html',
  styleUrls: ['./create-employess.component.css']
})
export class CreateEmployessComponent implements OnInit {

  
  employeeForm: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      contactPref: ['', Validators.required],
      phone: [''],
      email: ['']
    })
  }
  onSubmit(){
    console.log(this.employeeForm)
  }
  myEvent(event){
    if(this.employeeForm.get('name').errors){
      console.log(Object.keys(this.employeeForm.get('name').errors)[0] )
    }else{
      console.log('no object')
    }
    
  }

  contactPrefChange(selectedValue: string){
    const phoneCtrl = this.employeeForm.get('phone');
    const emailCtrl = this.employeeForm.get('email');
    
    if(selectedValue === "phone"){
      emailCtrl.clearValidators()
      phoneCtrl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(14),  Validators.pattern('[+0-9]*')]);
    }else{
      phoneCtrl.clearValidators()
      emailCtrl.setValidators([Validators.required, Validators.email]);
    }
    phoneCtrl.updateValueAndValidity()
    emailCtrl.updateValueAndValidity()
  }


  onLoadAPi(){
   
  }

}

