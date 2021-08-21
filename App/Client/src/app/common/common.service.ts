import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env  } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ReferenceData } from '../calculator/calculator.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  getRefData(): Observable<ReferenceData> {
    const url = `${env.baseUrl}/refData`;
    return this.httpClient.get<any>(url)
      .pipe(
        map(response => response,
        catchError(err => throwError(err)))
      );
  }
}
