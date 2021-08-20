import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: 'applicant-detail', component: ApplicantDetailComponent },
  { path: 'calculator', component: CalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
