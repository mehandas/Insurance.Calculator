import { TestBed, inject } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Action } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Observable, of, throwError } from "rxjs";
import { CommonService } from "../../common.service";
import { CommonEffects } from "../common.effects";

describe('CommonEffects', () => {
    let effects: CommonEffects;
    let actions$ = new Observable<Action>();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([CommonEffects])],
            providers: [
                CommonService,
                provideMockActions(() => actions$)
            ],
        });

        effects = TestBed.inject(CommonEffects);
    });

    it('should return response in payload when service call is success',
        inject([CommonService], (service: CommonService) => {
            // Arrange
            const response = { data: {} };
            actions$ = of({ type: '[ReferenceData] GET_REFERENCE_DATA' });
            spyOn(service, 'getRefData').and.returnValue(of(response));
        
            // Act
            effects.getRefData$.subscribe(action => {
                // Assert
                expect(action.type).toEqual('[ReferenceData] GET_REFERENCE_DATA_COMPLETE');
                expect(action.payload.response).toEqual(response);
                expect(action.payload.error).toBeUndefined();
            });
        })
    );

    it('should return error in payload when service call is not success',
        inject([CommonService], (service: CommonService) => {
            // Arrange
            const error = { error: {} };
            actions$ = of({ type: '[ReferenceData] GET_REFERENCE_DATA' });
            spyOn(service, 'getRefData').and.returnValue(throwError(error));
        
            // Act
            effects.getRefData$.subscribe(action => {
                // Assert
                expect(action.type).toEqual('[ReferenceData] GET_REFERENCE_DATA_COMPLETE');
                expect(action.payload.error).toEqual(error);
                expect(action.payload.response).toBeUndefined();
            });
        })
    );
});