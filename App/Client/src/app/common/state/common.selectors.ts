import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CommonState } from "./common.state";

const commonSelector = createFeatureSelector<CommonState>('common');

export const applicantDetails = createSelector(commonSelector, state => state?.applicantDetails);