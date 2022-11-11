import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Email } from '../models/email';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiServer = 'https://bern-travellog.herokuapp.com/api';

  constructor(private httpClient: HttpClient) {}
  
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    }),
  };

  sendEmail(email: Email): Observable<Email> {
    return this.httpClient
      .post<Email>(
        this.apiServer + '/sendEmail/',
        JSON.stringify(email),
        this.httpOptions
      )
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
