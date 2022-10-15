import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegPageComponent } from './components/courses/reg-page/reg-page.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DataTableComponent } from './components/courses/course-list/data-table/data-table.component';

const routes: Routes = [

  {path: '', component: DashboardComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'courseReg', component: RegPageComponent, outlet: 'crsReg' },
  {path: 'courseList', component: CourseListComponent, outlet: 'crsList' },
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'courseList', component: DataTableComponent , outlet: 'assgnList' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
