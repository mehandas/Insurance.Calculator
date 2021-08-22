import { CommonReducer } from '../common.reducer';
import * as commonActions from '../common.action';
import { ApplicantDetails } from '../../../applicant-detail/applicant-detail.model';
import { ReferenceData } from './../../reference-data.model';

describe('CommonReducer', () => {
    const currentState = { applicantDetails: new ApplicantDetails(),
        refData: null as unknown as ReferenceData, error: null };
        
    it('should set applicant details to common state', () => {
        // Arrange
        const request = { name: 'test', age: 25, dateOfBirth: '31-08-2021' };

        // Act
        const commonState = CommonReducer(currentState, new commonActions.UpdateApplicantDetails(request));

        // Assert
        expect(commonState.applicantDetails.name).toBe('test');
        expect(commonState.applicantDetails.age).toBe(25);
        expect(commonState.applicantDetails.dateOfBirth).toBe('31-08-2021');
    });

    it('should set refData to common state', () => {
        // Arrange
        const response = { occupations: [{ id: 1, name: 'test occupation' }] } as ReferenceData;

        // Act
        const commonState = CommonReducer(currentState, new commonActions.GetRefDataComplete({ response: response }));

        // Assert
        expect(commonState.refData).not.toBeNull();
        expect(commonState.error).toBeNull();
        expect(commonState.refData.occupations).toBeDefined();
    });

    it('should set error to common state', () => {
        // Arrange
        const response = { message: 'error' };

        // Act
        const commonState = CommonReducer(currentState, new commonActions.GetRefDataComplete({ error: response }));

        // Assert
        expect(commonState.refData).toBeNull();
        expect(commonState.error).not.toBeNull();
        expect(commonState.error).toBeDefined();
    });
});