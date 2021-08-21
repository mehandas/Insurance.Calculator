import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../common/common.constants';
import { OccupationModel, StateModel } from './calculator.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  title = 'Calculator';
  calculatorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeCalculatorForm();
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
}
