import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = "http://localhost:3000/login"
  private registerUrl = "http://localhost:3000/register"

  constructor(private http: HttpClient) { }

  loginUser(user){
    return this.http.post<any>(this.loginUrl, user)
  }
  registerUser(user){
    return this.http.post<any>(this.registerUrl, user)
  }
  logged(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }


  postRequest = (url, data) =>{
    return this.http.post<any>(url, data)
  }
  deleteRequest = (url, data) =>{
    return this.http.delete<any>(url, data)
  }
  
}
