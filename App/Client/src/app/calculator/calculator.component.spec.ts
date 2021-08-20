import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialize applicant form', () => {
    it('should initialize the applicant form on load', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.calculatorForm).toBeTruthy();
    });

    it('should initialize the applicant form controls on load', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.calculatorForm.controls.occupation).toBeTruthy();
      expect(component.calculatorForm.controls.sumInsured).toBeTruthy();
      expect(component.calculatorForm.controls.totalMonthlyExpenses).toBeTruthy();
      expect(component.calculatorForm.controls.state).toBeTruthy();
      expect(component.calculatorForm.controls.postCode).toBeTruthy();
    });
  });
});
