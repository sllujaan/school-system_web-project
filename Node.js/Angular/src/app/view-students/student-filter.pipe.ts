import { PipeTransform, Pipe } from '@angular/core';
import { ViewStudentsComponent } from './view-students.component';

@Pipe({
    name:'studentFilter'
})
export class studetnFilterPipe implements PipeTransform{
    transform(student:ViewStudentsComponent , search:string){
        console.log(student.getStds())
        if(!student.students || search){
            return student.students
        }
        return student.students.filter(std => {
            std.name.lowerCase().indexOf(search.toLocaleLowerCase()) != -1
        })
    }
}