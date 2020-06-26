import { Teacher} from './../../shared/teacher';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit,NgZone } from '@angular/core';

import { Router } from '@angular/router';



@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  TeacherData: any = [];
  teacherId:any;


  constructor(private teacherApi: ApiService,
    private router: Router,
    private ngZone: NgZone,) {
    this.teacherApi.GetTeachers().subscribe(data => {
      console.log(data);
      this.TeacherData = data;
     
      
    })    
   }

  ngOnInit() {
  }
  deleteTeacher(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.TeacherData;
      data.splice(index, 1);
      this.TeacherData = data;
      console.log(this.TeacherData)
      this.teacherApi.DeleteTeacher(e._id).subscribe()
    }
  }
  editTeacher(ide){
    this.teacherId=ide;
    console.log(this.teacherId);
    let url: string = "/edit-teacher/" + this.teacherId
    this.ngZone.run(() => this.router.navigateByUrl(url))
  }
}
