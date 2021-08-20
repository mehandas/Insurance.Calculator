import { applicantDetails } from '../common.selectors'
import { CommonState } from '../common.state';

describe('CommonSelectors', () => {
    it('should return applicant details from state', () => {
        // Arrange
        const currentState: CommonState = {
            applicantDetails: { name: 'test', age: 25, dateOfBirth: '31-08-2021' },
        };

        // Act
        const response = applicantDetails.projector(currentState);

        // Assert
        expect(response).toEqual(currentState.applicantDetails);
    });
});