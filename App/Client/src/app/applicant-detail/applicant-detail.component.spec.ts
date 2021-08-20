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
});
