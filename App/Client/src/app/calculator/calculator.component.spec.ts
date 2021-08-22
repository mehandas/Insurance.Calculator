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
import { ReferenceData } from '../common/reference-data.model';
import { GetRefData } from '../common/state/common.action';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  const referenceData: ReferenceData = {
    occupations: [{
      id: 1,
      name: 'Cleaner',
      ratingId: 3
    }],
    occupationRatings: [{
      id: 3,
      name: 'Light Manual',
      factor: 1.70
    }],
    states: [{
      id: 1,
      name: 'State 1'
    }]
  };

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
      expect(occupationElement.options.length).toBeGreaterThan(0);
      expect(stateElement.options.length).toBeGreaterThan(0);
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

    it('should get reference from commonstore', inject([Store], (store: Store<CommonState>) => {
      // Arrange      
      const mockReferenceData = { occupations: {} } as ReferenceData;
      component.referenceData = null as unknown as ReferenceData;
      spyOn(store, 'pipe').and.returnValue(of(mockReferenceData));
      spyOn(store, 'dispatch');

      // Act
      component.ngOnInit();

      // Assert
      expect(store.pipe).toHaveBeenCalled();
      expect(component.referenceData).toEqual(mockReferenceData);
      expect(store.dispatch).not.toHaveBeenCalled();
    }));

    it('should call dispatcher reference data is null in commonstore', inject([Store], (store: Store<CommonState>) => {
      // Arrange      
      const mockReferenceData = null as unknown as ReferenceData;
      component.referenceData = mockReferenceData;
      spyOn(store, 'pipe').and.returnValue(of(mockReferenceData));
      spyOn(store, 'dispatch');

      // Act
      component.ngOnInit();

      // Assert
      expect(store.pipe).toHaveBeenCalled();
      expect(component.referenceData).toBeNull();
      expect(store.dispatch).toHaveBeenCalledWith(new GetRefData());
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
    it('should return occupation list form referenceData', () => {
      // Arrange
      component.referenceData = referenceData;

      // Act
      const occupations = component.Occupations;

      // Assert
      expect(occupations.length).toBeGreaterThan(0);
      expect(occupations[0].id).toBe(1);
      expect(occupations[0].name).toBe('Cleaner');
      expect(occupations[0].ratingId).toBe(3);
    });

    it('should return occupations as undefined when referenecData is null', () => {
      // Arrange
      component.referenceData = null as unknown as ReferenceData;

      // Act
      const occupations = component.Occupations;

      // Assert
      expect(occupations).toBeUndefined();
    });
  });

  describe('Property: States', () => {
    it('should return state list form referenceData', () => {
      // Arrange
      component.referenceData = referenceData;

      // Act
      const states = component.States;

      // Assert
      expect(states.length).toBeGreaterThan(0);
      expect(states[0].id).toBe(1);
      expect(states[0].name).toBe('State 1');
    });

    it('should return states as undefined when referenecData is null', () => {
      // Arrange
      component.referenceData = null as unknown as ReferenceData;

      // Act
      const states = component.States;

      // Assert
      expect(states).toBeUndefined();
    });
  });

  describe('Property: OccupationRatings', () => {
    it('should return occupation ratings list form referenceData', () => {
      // Arrange
      component.referenceData = referenceData;

      // Act
      const ratings = component.OccupationRatings;

      // Assert
      expect(ratings.length).toBeGreaterThan(0);
      expect(ratings[0].id).toBe(3);
      expect(ratings[0].name).toBe('Light Manual');
      expect(ratings[0].factor).toBe(1.7);
    });

    it('should return occupation ratings as undefined when referenecData is null', () => {
      // Arrange
      component.referenceData = null as unknown as ReferenceData;

      // Act
      const ratings = component.OccupationRatings;

      // Assert
      expect(ratings).toBeUndefined();
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

  describe('Method: OnCalculateButtonClick', () => {
    it('should calculate total value and display on screen', () => {
      // Arrange
      component.calculatorForm.controls.sumInsured.setValue('100000');
      component.calculatorForm.controls.occupation.setValue('1');
      component.applicantDetails = { age: 20 } as ApplicantDetails;
      component.referenceData = referenceData;

      // Act
      component.OnCalculateButtonClick();
      fixture.detectChanges();

      // Assert
      const element: HTMLLabelElement = fixture.debugElement.nativeElement.querySelector('#lblTotalValue');
      expect(component.totalValue).toBe(7.083333333333333);
      expect(element.innerText).toBe('7.083333333333333');
    });

    it('should calculate total value as 0 when occupation is invalid', () => {
      // Arrange
      component.calculatorForm.controls.sumInsured.setValue('100000');
      component.calculatorForm.controls.occupation.setValue('');
      component.applicantDetails = { age: 20 } as ApplicantDetails;
      component.referenceData = referenceData;

      // Act
      component.OnCalculateButtonClick();
      fixture.detectChanges();

      // Assert
      const element: HTMLLabelElement = fixture.debugElement.nativeElement.querySelector('#lblTotalValue');
      expect(component.totalValue).toBe(0);
      expect(element.innerText).toBe('0');
    });

    it('should calculate total value as 0 when sum-insured value is invalid', () => {
      // Arrange
      component.calculatorForm.controls.sumInsured.setValue('');
      component.calculatorForm.controls.occupation.setValue('1');
      component.applicantDetails = { age: 20 } as ApplicantDetails;
      component.referenceData = referenceData;

      // Act
      component.OnCalculateButtonClick();
      fixture.detectChanges();

      // Assert
      const element: HTMLLabelElement = fixture.debugElement.nativeElement.querySelector('#lblTotalValue');
      expect(component.totalValue).toBe(0);
      expect(element.innerText).toBe('0');
    });

    it('should calculate total value as 0 when reference-data is null', () => {
      // Arrange
      component.calculatorForm.controls.sumInsured.setValue('100000');
      component.calculatorForm.controls.occupation.setValue('1');
      component.applicantDetails = { age: 20 } as ApplicantDetails;
      component.referenceData = null as unknown as ReferenceData;

      // Act
      component.OnCalculateButtonClick();
      fixture.detectChanges();

      // Assert
      const element: HTMLLabelElement = fixture.debugElement.nativeElement.querySelector('#lblTotalValue');
      expect(component.totalValue).toBe(0);
      expect(element.innerText).toBe('0');
    });
  });
});
