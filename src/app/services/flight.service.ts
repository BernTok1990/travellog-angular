import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiServer = 'https://bern-travellog.herokuapp.com/api';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  create(flight: Flight): Observable<Flight> {
    return this.httpClient
      .post<Flight>(
        this.apiServer + '/flights/',
        JSON.stringify(flight),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getByTravelId(id: number): Observable<Flight[]> {
    return this.httpClient
      .get<Flight[]>(this.apiServer + '/flights/' + id)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Flight>(this.apiServer + '/flights/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
