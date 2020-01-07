import { Component, OnInit, Injectable} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-bulder-test',
  templateUrl: './form-bulder-test.component.html',
  styleUrls: ['./form-bulder-test.component.css']
})

@Injectable()
export class FormBulderTestComponent implements OnInit {
  
  loginForm: FormGroup
  
  public logging = false;
  public loggingError = false;

  constructor(private _auth: AuthService, private fb: FormBuilder, private router: Router) {
  }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    })

  }

  submit(){
    if(this.logging == false){
      
      this.loggingError = false
      this.logging = true;
      console.log(this.loginForm.value)
      const user = this.loginForm.value
      this._auth.loginUser(user).subscribe(
        res => {
          console.log(res)
          localStorage.setItem("token", res.token)

          setTimeout(() => {
            this.logging = false;
            this.router.navigate(['/home'])
          }, 1500);
          
        },
        err => {
          console.log(err)
          
          setTimeout(() => {
            this.loggingError = true
            this.logging = false;
          }, 1500);
        }
        
      )
  
      /*setTimeout(() => {
        this.logging = false;
        this.loggingError = true
      }, 3000);*/
    }
    
  }

  loginEvent(event){
    if(event.keyCode == 13){
      console.log("Enter")
      this.submit()
    }
  }




  getErrorMessage(name: string) {
    if(name == "n"){
      return this.loginForm.get('name').hasError('required') ? 'Name is required' : '';
    }
    if(name == "p"){
      return this.loginForm.get('name').hasError('required') ? 'Password is required' : '';
    }
    return ''
  }
  


}
