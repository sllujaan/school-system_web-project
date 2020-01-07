import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  
  constructor(private http:HttpClient, private autthService :AuthService, private route: Router){ }
  
  private homeUrl = "http://localhost:3000/home"


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
      console.log(route)
      console.log(state)
      
      if(state.url === '/home'){
        if(this.autthService.logged()){
          return true;
        }else{
          this.route.navigate(['login']);
          return false;
        }
      }
      else if(state.url === '/login') {
        console.log("yes stateUrl == login")
        if(this.autthService.logged()){
          this.route.navigate(['home']);
          return false;
        }else{
          return true;
        }
      }
      else if(state.url === '/students') {
        console.log("yes stateUrl == students")
        return true
      }
      else{
        console.log("yes stateUrl == false")
          if(this.autthService.logged()){
            return true
          }else{
            this.route.navigate(['login'])
            return false
          }
      }
      

    
  }


  /*
  authenticateUser(){
    return this.http.get<any>(this.authUrl).subscribe(
      res => {console.log("200 response");return true},
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status == 500){
            console.log("500 response")
            return false
          }else if(err.status == 401){
            console.log("401 response")
            return false
          }
          else{
            console.log(err)
          }
        }
      }
    )
  }*/
  
}

