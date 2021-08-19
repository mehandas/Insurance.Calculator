import { componentFactoryName } from '@angular/compiler';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;    
  });

  it('should create the app component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Insurance calculator');
  });

  it('should navigate to applicant-detail on page load', inject([Router], (router: Router) =>{
    // Arrange
    spyOn(router, 'navigate');

    // Act
    component.ngOnInit();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['applicant-detail']);
  }));
});
