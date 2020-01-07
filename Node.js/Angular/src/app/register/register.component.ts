import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm:FormGroup
  public date
  public logging = false;
  public loggingError = false;
  public age = [20,21,22,23,24,25,26,27,28,29,30]
  constructor(private auth: AuthService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      fatherName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      age: [20, [Validators.required, Validators.min(15), Validators.max(50)]],
      date: [Date, [Validators.required]]
    })
    //console.log("date = "+this.date)
    console.log(this.userForm.get("date"))
  }


  onSubmit(){
    console.log(this.userForm.value)
    const user = this.userForm.value
    this.auth.registerUser(user).subscribe(
      res => {
        if(Object.keys(res).length !== 0){
          console.log(res);
        }
      },
      err =>{
        console.log("err in registration with status "+err.status);
        console.log("err in registration ===== "+err);
      }
    )
  }
  changeFun(event){
    console.log("date = ")
    console.log(event.value)
    this.date = event.value
    console.log(this.userForm.get('date').value)
    
  }
  

  getErrorMessage(name: string) {
    if(name == "n" || name == "f"){
      return this.userForm.get('name').hasError('required') ? 'You must enter a value' :
           this.userForm.get('name').hasError('minlength') ? 'Name must be of 5 charachters' :
            '';
    }
    else if(name == 'a'){
      return this.userForm.get('age').hasError('required') ? 'age must enter a value' :
           this.userForm.get('age').hasError('minlength') ? 'age must be of 5 charachters' :
            '';
    }
    else if(name == 'e'){
      return this.userForm.get('email').hasError('required') ? 'email must enter a value' :
           this.userForm.get('email').hasError('minlength') ? 'email must be of 5 charachters' :
            '';
    }
    else if(name == 'd'){
      return this.userForm.get('date').hasError('required') ? 'Date is required' : '';
    }
    return ''
  }

}
