import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicantDetailComponent } from './applicant-detail.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CommonState } from '../common/state/common.state';
import { UpdateApplicantDetails } from '../common/state/common.action';
import { of } from 'rxjs';
import { ApplicantDetails } from './applicant-detail.model';
import { CommonReducer } from '../common/state/common.reducer';
import { AppRoutingModule } from '../app-routing.module';

describe('ApplicantDetailComponent', () => {
  let component: ApplicantDetailComponent;
  let fixture: ComponentFixture<ApplicantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantDetailComponent],
      imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('common', CommonReducer)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set component title value', () => {
    // Act
    fixture.detectChanges();

    // Assert
    const element = fixture.debugElement.query(By.css('.component-title')).nativeElement;
    expect(element.innerText).toBe('Applicant Detail');
  });

  describe('Method: ngOnInit', () => {
    it('should initialize the applicant form on load', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.applicantForm).toBeTruthy();
    });

    it('should initialize the applicant form controls on load', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.applicantForm.controls.name).toBeTruthy();
      expect(component.applicantForm.controls.age).toBeTruthy();
      expect(component.applicantForm.controls.dateOfBirth).toBeTruthy();
    });

    it('should get applicant-details data from store and set form values', inject([Store], (store: Store<CommonState>) => {
      // Arrange
      const mockApplicantDetails = { name: 'test' } as ApplicantDetails;
      component.applicantDetails = null as unknown as ApplicantDetails;
      spyOn(store, 'pipe').and.returnValue(of(mockApplicantDetails));

      // Act
      component.ngOnInit();

      // Assert
      expect(store.pipe).toHaveBeenCalled();
      expect(component.applicantDetails).toEqual(mockApplicantDetails);
      expect(component.applicantForm.value.name).toBe(mockApplicantDetails.name);
    }));

    it('should not set applicant-details data when data in store is null', inject([Store], (store: Store<CommonState>) => {
      // Arrange      
      component.applicantDetails = { name: 'test' } as ApplicantDetails;
      const mockApplicantDetails = null as unknown as ApplicantDetails;
      spyOn(store, 'pipe').and.returnValue(of(mockApplicantDetails));

      // Act
      component.ngOnInit();

      // Assert
      expect(component.applicantDetails).toEqual({ name: 'test' } as ApplicantDetails);
    }));
  });

  describe('Validate applicant form controls', () => {
    it('should set required error when control value is empty', () => {
      // Arrange
      component.applicantForm.controls.name.setValue('');
      component.applicantForm.controls.age.setValue('');
      component.applicantForm.controls.dateOfBirth.setValue('');

      // Act
      fixture.detectChanges()

      // Assert
      expect(component.applicantForm.controls.name.errors?.required).toBe(true);
      expect(component.applicantForm.controls.age.errors?.required).toBe(true);
      expect(component.applicantForm.controls.dateOfBirth.errors?.required).toBe(true);
    });

    [
      { value: '', expectedPatternError: false },
      { value: 10, expectedPatternError: false },
      { value: 'test', expectedPatternError: true },
      { value: '10.10', expectedPatternError: true }
    ].forEach((testCase) => {
      it(`should set pattern error as ${testCase.expectedPatternError} when value of age is ${testCase.value}`, () => {
        // Arrange
        component.applicantForm.controls.age.setValue(testCase.value);

        // Act
        fixture.detectChanges()

        // Assert
        if (testCase.expectedPatternError) {
          expect(component.applicantForm.controls.age.errors?.pattern).toBeDefined();
        } else {
          expect(component.applicantForm.controls.age.errors?.pattern).toBeUndefined();
        }
      });
    });
  });

  describe('Disable/Enable Next button', () => {
    it('should disable Next button when form is invalid', () => {
      // Arrange
      component.applicantForm.controls.name.setValue('');
      component.applicantForm.controls.age.setValue('');
      component.applicantForm.controls.dateOfBirth.setValue('');

      // Act
      fixture.detectChanges()

      // Assert
      const element: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#btnNext');
      expect(element.disabled).toBe(true);
    });

    it('should enable Next button when form is valid', () => {
      // Arrange
      component.applicantForm.controls.name.setValue('Test');
      component.applicantForm.controls.age.setValue(10);
      component.applicantForm.controls.dateOfBirth.setValue('31-08-2021');

      // Act
      fixture.detectChanges()

      // Assert
      const element: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#btnNext');
      expect(element.disabled).toBe(false);
    });
  });

  describe('Method: hasError', () => {
    [
      { control: 'name', value: '', expected: true },
      { control: 'name', value: 'test', expected: false },
      { control: 'age', value: '', expected: true },
      { control: 'age', value: '100', expected: false },
      { control: 'age', value: 'text', expected: true }
    ].forEach((testCase) => {
      it('should return true/false based on control touched and errors value', () => {
        component.applicantForm.controls[testCase.control].setValue(testCase.value);
        component.applicantForm.controls[testCase.control].markAsTouched();

        // Act
        let hasError = component.hasError(testCase.control);

        // Assert
        expect(hasError).toBe(testCase.expected);
      });
    });
  });

  describe('Method: onNextButtonClick', () => {
    it('should navigate to calculator component', inject([Router], (router: Router) => {
      // Arrange
      spyOn(router, 'navigate');

      // Act
      component.onNextButtonClick();

      // Assert
      expect(router.navigate).toHaveBeenCalledWith(['calculator'])
    }));

    it('should update the applicant-details form data to the state', inject([Store], (store: Store<CommonState>) => {
      // Arrange
      spyOn(store, 'dispatch');
      component.applicantForm.controls.name.setValue('test');
      component.applicantForm.controls.age.setValue('20');
      component.applicantForm.controls.dateOfBirth.setValue('05/08/2021');

      // Act
      component.onNextButtonClick();

      // Assert
      expect(store.dispatch)
        .toHaveBeenCalledWith(new UpdateApplicantDetails({ name: 'test', age: 20, dateOfBirth: '05/08/2021' }));
    }));
  });
});
