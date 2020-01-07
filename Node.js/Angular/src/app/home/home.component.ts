import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private events = []

  constructor(private _eventService: EventService, private router: Router) { }

  ngOnInit() {
    this._eventService.getEvents()
    .subscribe(
      res => this.events = res,
      err => {
        if(err instanceof HttpErrorResponse){
          console.log("instance")
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }

}
