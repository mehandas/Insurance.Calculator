import { ApplicantDetails } from "../../applicant-detail/applicant-detail.model"

export interface CommonState {
    applicantDetails: ApplicantDetails;
    refData: any;
    error: any;
}