import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
export interface Subject {
  name: string;
}
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList',{static: true}) chipList;
  @ViewChild('resetTeacherForm',{static: true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  teacherForm: FormGroup;
  subjectArray: Subject[] = [];
  

  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private teacherApi: ApiService
  ) { 
    
  }

  ngOnInit() {
    this.submitBookForm();
  }
  /* Reactive book form */
  submitBookForm() {
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

  /* Submit book */
  submitTeacherForm() {
    if (this.teacherForm.valid) {
      this.teacherApi.AddTeacher(this.teacherForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/teachers-list'))
      });
    }
  }
   /* Submit book */
   reset() {
    
      this.teacherForm.reset();
  }
  
}
