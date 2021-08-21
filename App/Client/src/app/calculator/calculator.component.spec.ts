import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
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

  describe('Method: ngOnInit', () => {
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

    it('should bind dropdown values', () => {
      // Act
      component.ngOnInit();

      // Assert
      const occupationElement: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#occupation');
      const stateElement: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#state');
      expect(occupationElement.options.length).toBe(6);
      expect(stateElement.options.length).toBe(2);
    });
  });

  describe('Method: OnPreviousButtonClick', () => {
    it('should navigate to calculator component', inject([Router], (router: Router) => {
      // Arrange
      spyOn(router, 'navigate');

      // Act
      component.OnPreviousButtonClick();

      // Assert
      expect(router.navigate).toHaveBeenCalledWith(['applicant-detail']);
    }));
  });

  describe('Property: Occupations', () => {
    it('should return occupation list form constant', () => {
      // Act
      const occupatons = component.Occupations;

      // Assert
      expect(occupatons.length).toBe(6);
    });
  });

  describe('Property: States', () => {
    it('should return state list form constant', () => {
      // Act
      const states = component.States;

      // Assert
      expect(states.length).toBe(2);
    });
  });
});
