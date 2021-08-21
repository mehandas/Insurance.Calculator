import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CommonReducer } from './common/state/common.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CommonEffects } from './common/state/common.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ApplicantDetailComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('common', CommonReducer),
    EffectsModule.forRoot([CommonEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
