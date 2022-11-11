import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Travel } from '../models/travel';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiServer = 'https://bern-travellog.herokuapp.com/api';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  create(travel: Travel): Observable<Travel> {
    return this.httpClient
      .post<Travel>(
        this.apiServer + '/travels/',
        JSON.stringify(travel),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<Travel> {
    return this.httpClient
      .get<Travel>(this.apiServer + '/travels/id/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getUserTravels(id: number): Observable<Travel[]> {
    return this.httpClient
      .get<Travel[]>(this.apiServer + '/travels/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(travel: Travel): Observable<Travel> {
    return this.httpClient
      .put<Travel>(
        this.apiServer + '/travels/' + travel.id,
        JSON.stringify(travel),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Travel>(this.apiServer + '/travels/' + id, this.httpOptions)
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
