import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import{EditTeacherComponent} from './components/edit-teacher/edit-teacher.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-teacher' },
  { path: 'add-teacher', component: AddTeacherComponent },
  { path: 'edit-teacher/:id', component: EditTeacherComponent },
  { path: 'teachers-list', component: TeacherListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
