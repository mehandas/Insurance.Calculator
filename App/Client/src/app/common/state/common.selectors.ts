import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CommonState } from "./common.state";

const commonSelector = createFeatureSelector<CommonState>('common');

export const applicantDetails = createSelector(commonSelector, state => state?.applicantDetails);

export const refData = createSelector(commonSelector, state => state?.refData);

export const error = createSelector(commonSelector, state => state?.error);