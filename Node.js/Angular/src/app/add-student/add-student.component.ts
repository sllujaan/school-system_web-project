import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public date: Date
  public studentForm
  public age = [20,21,22,23,24,25,26,27,28,29,30]
  //public imagePath = "assets/images/image1.jpg"
  public imagePath = "http://localhost:3000/students/new/imagePost"
  public file = null
  constructor(private http:HttpClient, private router: Router, private authService:AuthService, private fb:FormBuilder) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      fatherName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      age: [20, [Validators.required, Validators.min(15), Validators.max(50)]],
      course: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    })
    console.log("date = "+this.date)
    
    let file = this.getImage("http://localhost:3000/students/new/imagePost")
    console.log(file)
    console.log(typeof(file))
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader.result)
       this.file = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  submit(){
    console.log(this.studentForm.value)
    this.authService.postRequest("http://localhost:3000/students/new", this.studentForm.value)
    .subscribe(
      res => {
          console.log(res)
          this.router.navigate(['/students'])
      },
      err => console.log(err)
    )
  }

  name = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]);
  getErrorMessage(name: string) {
    if(name == "n" || name == "f"){
      return this.studentForm.get('name').hasError('required') ? 'You must enter a value' :
           this.studentForm.get('name').hasError('minlength') ? 'Name must be of 5 charachters' :
            '';
    }
    else if(name == 'a'){
      return this.studentForm.get('age').hasError('required') ? 'age must enter a value' :
           this.studentForm.get('age').hasError('minlength') ? 'age must be of 5 charachters' :
            '';
    }
    else if(name == 'e'){
      return this.studentForm.get('email').hasError('required') ? 'email must enter a value' :
           this.studentForm.get('email').hasError('minlength') ? 'email must be of 5 charachters' :
            '';
    }
    return ''
  }

  imageUploadFun(event){
    console.log(event)

    this.file = event.target.files[0];
    console.log(this.file)
    var reader = new FileReader();

    reader.readAsDataURL(this.file)
    console.log("readAsDataUrl called...")

    reader.onload = (event:any) => {
      console.log("onload event => ")
      console.log(event)
      this.imagePath = event.target.result
      console.log("imagePath = "+this.imagePath)
    }

    
    




    console.log(event.target.files[0].name)
    let name = event.target.files[0].name
    let extension = name.split('.')
    extension.reverse().forEach((element, index) => {
      console.log(element + index)
    });
    let formate = ['jpg', 'png']
    if(!formate.includes(extension[0])){
      console.log("invalid file formate")
    }
  }

  trySubmit(){
    const fd = new FormData()
    fd.append('userImage', this.file, this.file.name)

    this.http.post<any>("http://localhost:3000/students/new/imagePost", fd).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }


}
