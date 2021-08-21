import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Constants } from '../common/common.constants';
import { CommonState } from '../common/state/common.state';
import { OccupationModel, StateModel } from './calculator.model';
import * as commonSelectors from '../common/state/common.selectors';
import { ApplicantDetails } from '../applicant-detail/applicant-detail.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  title = 'Calculator';
  calculatorForm!: FormGroup;
  applicantDetails!: ApplicantDetails;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<CommonState>) {}

  ngOnInit(): void {
    this.initializeCalculatorForm();
    this.subscribeToState();
  }

  hasError(val: string): boolean {
    let control: AbstractControl = this.calculatorForm.controls[val];
    return control?.touched && control?.errors ? true : false;
  }

  OnPreviousButtonClick(): void {
    this.router.navigate(['applicant-detail']);
  }

  get Occupations(): Array<OccupationModel> {
    // TODO :: Get occupation list from Api
    return Constants.Occupations;
  }

  get States(): Array<StateModel> {
    // TODO :: Get state list from Api
    return Constants.States;
  }

  private initializeCalculatorForm(): void {
    this.calculatorForm = this.formBuilder.group({
      occupation: ['', Validators.required],
      sumInsured: ['', [Validators.required,
      Validators.pattern(Constants.RegexPattern.NumberOnly), Validators.min(1000), Validators.max(1000000)]],
      expenses: ['', [Validators.required, Validators.pattern(Constants.RegexPattern.NumberOnly)]],
      state: ['', Validators.required],
      postCode: ['', [Validators.required,
      Validators.pattern(Constants.RegexPattern.NumberOnly), Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  private subscribeToState(): void {
    this.store
      .pipe(select(commonSelectors.applicantDetails))
      .subscribe((applicantDetails: ApplicantDetails) => {
        this.applicantDetails = applicantDetails;
      });
  }
}
