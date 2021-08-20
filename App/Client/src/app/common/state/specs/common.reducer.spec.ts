import { CommonReducer } from '../common.reducer';
import * as commonActions from '../common.action';
import { ApplicantDetails } from '../../../applicant-detail/applicant-detail.model';

describe('CommonReducer', () => {
    it('should set applicant details to common state', () => {
        // Arrange
        const currentState = { applicantDetails: new ApplicantDetails() };
        const request = { name: 'test', age: 25, dateOfBirth: '31-08-2021' };

        // Act
        const commonState = CommonReducer(currentState, new commonActions.UpdateApplicantDetails(request));

        // Assert
        expect(commonState.applicantDetails.name).toBe('test');
        expect(commonState.applicantDetails.age).toBe(25);
        expect(commonState.applicantDetails.dateOfBirth).toBe('31-08-2021');
    });
});