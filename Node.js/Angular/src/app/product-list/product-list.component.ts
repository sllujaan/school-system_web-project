import { Component, OnInit } from '@angular/core';
import { FormBulderTestComponent } from '../FormBulderTest/form-bulder-test/form-bulder-test.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private auth: FormBulderTestComponent) { }
  
  ngOnInit() {
  }

}
