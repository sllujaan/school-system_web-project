import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { FormBulderTestComponent } from './FormBulderTest/form-bulder-test/form-bulder-test.component';
import { HomeComponent } from './home/home.component';
import { CreateEmployessComponent } from './employees/create-employess.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { RecyclebinComponent } from './recyclebin/recyclebin.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  {path:'list', component: ListEmployeesComponent, canActivate: [AuthGuard]},
  {path:'login', component: FormBulderTestComponent, canActivate: [AuthGuard]},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'students', component: ViewStudentsComponent, canActivate: [AuthGuard]},
  {path:'create', component: CreateEmployessComponent},
  {path:'table', component: TableComponent},
  {path:'students/recyclebin', component: RecyclebinComponent},
  {path:'students/edit/:id', component: EditStudentComponent},
  {path:'students/new', component: AddStudentComponent},
  {path:'', redirectTo: 'home' ,  pathMatch: 'full'},
  {path:'register', component: RegisterComponent},
  { path: '**',  component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
