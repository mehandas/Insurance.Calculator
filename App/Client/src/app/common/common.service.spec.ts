import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonService } from './common.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Method: getRefData', () => {
    it('should return reference data when api call is success', inject([HttpClient], (http: HttpClient) => {
      // Arrange
      let response: any;
      const refData = { occupations: [{ occupation: { id: 1, name: 'test' } }] };
      spyOn(http, 'get').and.returnValue(of(refData));

      // Act
      service.getRefData().subscribe(res => { response = res; });

      // Assert
      expect(response).toBe(refData);
    }));

    it('should return error response when api call fails', inject([HttpClient], (http: HttpClient) => {
      // Arrange
      let response: any;
      const errorResponse = new HttpErrorResponse({ error: 'Server error', status: 500 });
      spyOn(http, 'get').and.returnValue(throwError(errorResponse));

      // Act
      service.getRefData().subscribe(() => fail(), (error: HttpErrorResponse) => { response = error; });

      // Assert
      expect(response).toEqual(errorResponse);
    }));
  });
});
