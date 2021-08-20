import { Action } from "@ngrx/store";

import { ApplicantDetails } from "../../applicant-detail/applicant-detail.model";
import * as ActionTypes from './common.action.types'

export class UpdateApplicantDetails implements Action {
    readonly type = ActionTypes.UPDATE_APPLICANT_DETAILS;

    constructor(public applicantDetails: ApplicantDetails) {}
}

export type CommonActions = UpdateApplicantDetails;