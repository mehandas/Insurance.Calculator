import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicantDetailComponent } from './applicant-detail.component';
import { By } from '@angular/platform-browser';

describe('ApplicantDetailComponent', () => {
  let component: ApplicantDetailComponent;
  let fixture: ComponentFixture<ApplicantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantDetailComponent],
      imports: [ReactiveFormsModule]
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

  describe('Initialize applicant form', () => {
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
});
