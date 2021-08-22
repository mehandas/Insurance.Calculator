import { CommonActions } from "./common.action";
import { CommonState } from "./common.state";
import * as ActionTypes from './common.action.types'
import { ApplicantDetails } from "../../applicant-detail/applicant-detail.model";
import { ReferenceData } from "./../reference-data.model";

const initialState: CommonState = {
    applicantDetails: new ApplicantDetails(),
    refData: null as unknown as ReferenceData,
    error: null
};

export function CommonReducer(state: CommonState = initialState, action: CommonActions): CommonState {
    switch (action.type) {
        case ActionTypes.UPDATE_APPLICANT_DETAILS:
            return {
                ...state,
                applicantDetails: action.applicantDetails
            };
        case ActionTypes.GET_REFERENCE_DATA_COMPLETE:
            if(action?.payload?.error){
                return {
                    ...state,
                    error: action.payload.error
                }
            }

            return {
                ...state,
                refData: action?.payload?.response,
                error: null
            };
        default:
            return state;
    }
}