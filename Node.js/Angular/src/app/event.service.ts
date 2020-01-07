import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private homeUrl = "http://localhost:3000/home"

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<any>(this.homeUrl)
  }
}
