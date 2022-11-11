import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  create(user: User): Observable<User> {
    return this.httpClient
      .post<User>(
        this.apiServer + '/users/',
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<User> {
    return this.httpClient
      .get<User>(this.apiServer + '/users/id/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getByUsername(username: string): Observable<User> {
    return this.httpClient
      .get<User>(this.apiServer + '/users/username/' + username)
      .pipe(catchError(this.errorHandler));
  }

  loginUser(username: string, password: string): Observable<User> {
    var credentials = {
        "username": username,
        "password": password
    };
    return this.httpClient
      .post<User>(
        this.apiServer + '/users/login/',
        JSON.stringify(credentials),
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
