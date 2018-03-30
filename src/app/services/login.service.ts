import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/observable';

@Injectable()
export class LoginService {
  public spinner = false;

  login(username: string, password: string): Observable<string> {
    this.spinner = true;
    return this.http.post<string>(`api/login?username=${username}&password=${password}`, null).pipe(
      tap(_ => this.log(`Login as ${username}`)),
    );
  }

  logout(): Observable<string> {
    this.spinner = true;
    return this.http.post<string>(`api/logout`, null).pipe(
      tap(_ => this.log(`Logout`)),
    );
  }

  private log(message: string) {
    this.spinner = false;
    console.log(message);
  }

  removeSpinner (): void {
    this.spinner = false;
  }

  constructor(
    private http: HttpClient
  ) { }


}
