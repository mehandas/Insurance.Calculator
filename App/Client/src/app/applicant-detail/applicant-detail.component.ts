import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.scss']
})
export class ApplicantDetailComponent implements OnInit {

  title = 'Applicant Detail';
  applicantForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeApplicantForm();
  }

  private initializeApplicantForm(): void {
    this.applicantForm = this.formBuilder.group({
      name: [''],
      age: [''],
      dateOfBirth: ['']
    });
  }
}
