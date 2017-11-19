import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';


@Injectable()
export class ProjectService {
  private projectUrl = `api/projects`;  // URL to web api
  /** GET hero by id. Will 404 if id not found */
  getAllProjects(): Observable<string[]> {
    const url = `${this.projectUrl}/getAll`;
    return this.http.get<string[]>(url).pipe(
      tap(_ => this.log(`fetched projects`)),
      catchError(this.handleError<string[]>(`get all project`))
    );
  }
  /** POST: add a new hero to the server */
  addProject (project: string): Observable<string> {
    console.log(project);
    return this.http.post<string>(this.projectUrl + `?name=${project}`, project).pipe(
      tap(_ => this.log(`added project w/ id=${project}`)),
      catchError(this.handleError<string>('addHero'))
    );
  }
  private log(message: string) {
    console.log('ProjectService: ' + message);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  constructor(
    private http: HttpClient
  ) { }

}
