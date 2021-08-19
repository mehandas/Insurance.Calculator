import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';

const routes: Routes = [{ path: 'applicant-detail', component: ApplicantDetailComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
