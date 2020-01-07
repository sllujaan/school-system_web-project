import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployessComponent } from './employees/create-employess.component';
import { FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { TestComponent } from './test/test/test.component';
import { FormBulderTestComponent } from './FormBulderTest/form-bulder-test/form-bulder-test.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { EventService } from './event.service';
import { TokenIntercepterService } from './token-intercepter.service';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { RecyclebinComponent } from './recyclebin/recyclebin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TableComponent } from './table/table.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ListEmployeesComponent,
    CreateEmployessComponent,
    TestComponent,
    FormBulderTestComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    RegisterComponent,
    ViewStudentsComponent,
    EditStudentComponent,
    AddStudentComponent,
    RecyclebinComponent,
    TableComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthService, EventService,FormBulderTestComponent, ViewStudentsComponent, FormControl, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenIntercepterService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [AddStudentComponent]
})
export class AppModule { }
