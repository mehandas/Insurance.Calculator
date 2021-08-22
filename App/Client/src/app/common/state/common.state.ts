import { ReferenceData } from "./../reference-data.model"
import { ApplicantDetails } from "../../applicant-detail/applicant-detail.model"

export interface CommonState {
    applicantDetails: ApplicantDetails;
    refData: ReferenceData;
    error: any;
}