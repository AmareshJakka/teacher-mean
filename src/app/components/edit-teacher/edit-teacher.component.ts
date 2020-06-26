import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}


@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList',{static:true}) chipList;
  @ViewChild('resetStudentForm',{static:true}) myNgForm;
  
  teacherForm: FormGroup;
  subjectArray: Subject[] = [];
  

  ngOnInit() {
    this.updateTeacherForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private teacherApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.teacherApi.GetTeacher(id).subscribe(data => {
      console.log(data.subjects)
      this.subjectArray = data.subjects;
      this.teacherForm = this.fb.group({
        name: [data.name, [Validators.required]],
        email: [data.email, [Validators.required]],
        phone: [data.phone, [Validators.required]],
        salary: [data.salary, [Validators.required]],
        subjects: [data.subjects],
        dob: [data.dob, [Validators.required]],
        gender: [data.gender]
      })      
    })    
  }
   /* Reactive book form */
   updateBookForm() {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      subjects: [this.subjectArray],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.teacherForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.teacherForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateTeacherForm() {
    
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.teacherApi.UpdateTeacher(id, this.teacherForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/teachers-list'))
      });
    }
  
  }

}
