import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';
import {AdditionalLiteratureComponent} from './additional-literature/additional-literature.component';
import {ConsultationTopicComponent} from './consultation-topic/consultation-topic.component';
import {CurriculumSectionComponent} from './curriculum-section/curriculum-section.component';
import {CurriculumTopicComponent} from './curriculum-topic/curriculum-topic.component';
import {DepartmentComponent} from './department/department.component';
import {GroupComponent} from './group/group.component';
import {OccupationFormComponent} from './occupation-form/occupation-form.component';
import {SectionNumberComponent} from './section-number/section-number.component';
import {TeacherComponent} from './teacher/teacher.component';
import {TeacherCategoryComponent} from './teacher-category/teacher-category.component';
import {TeachingPositionComponent} from './teaching-position/teaching-position.component';
import {TheQuestionComponent} from './the-question/the-question.component';
import {TrainingProgramComponent} from './training-program/training-program.component';
import {MainLiteratureComponent} from './main-literature/main-literature.component';
import {FormOfEducationComponent} from './form-of-education/form-of-education.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent},
  { path: 'home', component:  HomeComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'additionalLiterature', component: AdditionalLiteratureComponent, canActivate: [AuthGuardService]},
  { path: 'consultationTopic', component: ConsultationTopicComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumSection', component: CurriculumSectionComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumTopic', component: CurriculumTopicComponent, canActivate: [AuthGuardService]},
  { path: 'department', component: DepartmentComponent, canActivate: [AuthGuardService]},
  { path: 'formOfEducation', component: FormOfEducationComponent, canActivate: [AuthGuardService]},
  { path: 'group', component: GroupComponent, canActivate: [AuthGuardService]},
  { path: 'mainLiterature', component: MainLiteratureComponent, canActivate: [AuthGuardService]},
  { path: 'occupationForm', component: OccupationFormComponent, canActivate: [AuthGuardService]},
  { path: 'sectionNumber', component: SectionNumberComponent, canActivate: [AuthGuardService]},
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuardService]},
  { path: 'teacherCategory', component: TeacherCategoryComponent, canActivate: [AuthGuardService]},
  { path: 'teachingPosition', component: TeachingPositionComponent, canActivate: [AuthGuardService]},
  { path: 'theQuestion', component: TheQuestionComponent, canActivate: [AuthGuardService]},
  { path: 'trainingProgram', component: TrainingProgramComponent, canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
