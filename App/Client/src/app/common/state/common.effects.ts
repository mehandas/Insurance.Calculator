import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { CommonService } from "../common.service";
import * as commonAction from './common.action';
import {GET_REFERENCE_DATA} from './common.action.types';

@Injectable()
export class CommonEffects {

    constructor(private action$: Actions,
        private commonService: CommonService) { }

    getRefData$ = createEffect(() => {
        return this.action$.pipe(
            ofType<commonAction.GetRefData>(GET_REFERENCE_DATA),
            mergeMap(() => this.commonService.getRefData().pipe(
                    map(data => new commonAction.GetRefDataComplete({
                        response: data
                    })),
                    catchError(error => {
                        return of(new commonAction.GetRefDataComplete({
                            error: error
                        }));
                    })
                )
            )
        );
    });
}