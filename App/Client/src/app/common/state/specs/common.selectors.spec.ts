import { ReferenceData } from './../../reference-data.model';
import { applicantDetails, refData, error } from '../common.selectors'
import { CommonState } from '../common.state';

describe('CommonSelectors', () => {
    let currentState: CommonState;
    beforeEach(() => {
        currentState = {
            applicantDetails: { name: 'test', age: 25, dateOfBirth: '31-08-2021' },
            refData: { occupations: [{ id: 1, name: 'test occupation', ratingId: 1 }] } as ReferenceData,
            error: { message: 'error' }
        };
    });

    it('should return applicant details from state', () => {
        // Act
        const response = applicantDetails.projector(currentState);

        // Assert
        expect(response).toEqual(currentState.applicantDetails);
    });

    it('should return refData from state', () => {
        // Act
        const response = refData.projector(currentState);

        // Assert
        expect(response).toEqual(currentState.refData);
    });

    it('should return error from state', () => {
        // Act
        const response = error.projector(currentState);

        // Assert
        expect(response).toEqual(currentState.error);
    });
});