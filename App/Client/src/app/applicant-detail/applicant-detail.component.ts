import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonState } from '../common/state/common.state';
import { UpdateApplicantDetails } from '../common/state/common.action';
import { ApplicantDetails } from './applicant-detail.model';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss']
})
export class ApplicantDetailComponent implements OnInit {

  title = 'Applicant Detail';
  applicantForm!: FormGroup;
  applicanDetails!: ApplicantDetails;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<CommonState>) { }

  ngOnInit(): void {
    this.initializeApplicantForm();
  }

  hasError(val: string): boolean {
    let control: AbstractControl = this.applicantForm.controls[val];
    return control?.touched && control?.errors ? true : false;
  }

  onNextButtonClick() {
    this.updateApplicanDetailsModel();
    this.store.dispatch(new UpdateApplicantDetails(this.applicanDetails));
    this.router.navigate(['calculator']);
  }

  private initializeApplicantForm(): void {
    this.applicantForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
      dateOfBirth: ['', Validators.required]
    });
  }

  private updateApplicanDetailsModel(): void {
    this.applicanDetails = {
      name: this.applicantForm.value.name,
      age: Number(this.applicantForm.value.age),
      dateOfBirth: this.applicantForm.value.dateOfBirth
    };
  }
}
