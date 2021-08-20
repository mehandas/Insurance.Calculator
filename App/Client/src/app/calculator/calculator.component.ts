import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  title = 'Calculator';
  calculatorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeCalculatorForm();
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
