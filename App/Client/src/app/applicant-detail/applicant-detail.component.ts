import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss']
})
export class ApplicantDetailComponent implements OnInit {

  title = 'Applicant Detail';
  applicantForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeApplicantForm();
  }

  private initializeApplicantForm(): void {
    this.applicantForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
      dateOfBirth: ['', Validators.required]
    });
  }

  hasError(val: string): boolean {
    let control: AbstractControl = this.applicantForm.controls[val];
    return control?.touched && control?.errors ? true : false;
  }

  onNextButtonClick() {
    this.router.navigate(['calculator']);
  }  
}
