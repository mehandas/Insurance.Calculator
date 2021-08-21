import { Action } from "@ngrx/store";

import { ApplicantDetails } from "../../applicant-detail/applicant-detail.model";
import * as ActionTypes from './common.action.types'

export class UpdateApplicantDetails implements Action {
    readonly type = ActionTypes.UPDATE_APPLICANT_DETAILS;

    constructor(public applicantDetails: ApplicantDetails) { }
}

export class GetRefData implements Action {
    readonly type = ActionTypes.GET_REFERENCE_DATA;
    constructor() { }
}

export class GetRefDataComplete implements Action {
    readonly type = ActionTypes.GET_REFERENCE_DATA_COMPLETE;
    constructor(public payload: {
        response?: any,
        error?: any
    }) { }
}

export type CommonActions = UpdateApplicantDetails |
    GetRefData |
    GetRefDataComplete;