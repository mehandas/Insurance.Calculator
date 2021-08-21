import { CommonActions } from "./common.action";
import { CommonState } from "./common.state";
import * as ActionTypes from './common.action.types'
import { ApplicantDetails } from "../../applicant-detail/applicant-detail.model";

const initialState: CommonState = {
    applicantDetails: new ApplicantDetails()
};

export function CommonReducer(state: CommonState = initialState, action: CommonActions): CommonState {
    switch (action.type) {
        case ActionTypes.UPDATE_APPLICANT_DETAILS:
            return {
                ...state,
                applicantDetails: action.applicantDetails
            };
        default:
            return state;
    }
}