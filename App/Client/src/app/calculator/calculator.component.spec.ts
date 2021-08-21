import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CommonState } from '../common/state/common.state';
import { ApplicantDetails } from '../applicant-detail/applicant-detail.model';
import { of } from 'rxjs';
import { CommonReducer } from '../common/state/common.reducer';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('common', CommonReducer)
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
      expect(component.calculatorForm.controls.expenses).toBeTruthy();
      expect(component.calculatorForm.controls.state).toBeTruthy();
      expect(component.calculatorForm.controls.postCode).toBeTruthy();
    });

    it('should bind dropdown values', () => {
      // Act
      component.ngOnInit();

      // Assert
      const occupationElement: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#occupation');
      const stateElement: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#state');
      expect(occupationElement.options.length).toBe(7);
      expect(stateElement.options.length).toBe(3);
    });

    it('should get applicant-details from commonstore', inject([Store], (store: Store<CommonState>) => {
      // Arrange
      const mockApplicantDetails = { name: 'test', age: 20 } as ApplicantDetails;
      component.applicantDetails = null as unknown as ApplicantDetails;
      spyOn(store, 'pipe').and.returnValue(of(mockApplicantDetails));

      // Act
      component.ngOnInit();

      // Assert
      expect(store.pipe).toHaveBeenCalled();
      expect(component.applicantDetails).toEqual(mockApplicantDetails);
    }));
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
      const occupations = component.Occupations;

      // Assert
      expect(occupations.length).toBe(6);
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

  describe('Method: hasError', () => {
    [
      { control: 'occupation', value: '', expected: true },
      { control: 'occupation', value: 1, expected: false },
      { control: 'sumInsured', value: '', expected: true },
      { control: 'sumInsured', value: 100, expected: true },
      { control: 'sumInsured', value: 1000, expected: false },
      { control: 'sumInsured', value: 1000000, expected: false },
      { control: 'sumInsured', value: 1000001, expected: true },
      { control: 'expenses', value: '', expected: true },
      { control: 'expenses', value: 100.100, expected: true },
      { control: 'expenses', value: 100, expected: false },
      { control: 'state', value: '', expected: true },
      { control: 'state', value: 1, expected: false },
      { control: 'postCode', value: '', expected: true },
      { control: 'postCode', value: 1234, expected: false },
    ].forEach((testCase) => {
      it(`should return ${testCase.expected} when '${testCase.control}' value is ${testCase.value} and touched`, () => {
        // Arrange
        component.calculatorForm.controls[testCase.control].setValue(testCase.value);
        component.calculatorForm.controls[testCase.control].markAsTouched();

        // Act
        let hasError = component.hasError(testCase.control);

        // Assert
        expect(hasError).toBe(testCase.expected);
      });
    });
  });
});
