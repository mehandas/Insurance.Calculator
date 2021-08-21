import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      occupation: [''],
      sumInsured: [''],
      totalMonthlyExpenses: [''],
      state: [''],
      postCode: ['']
    });
  }
}
