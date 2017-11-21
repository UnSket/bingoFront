import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Project} from "./model/Project";


@Injectable()
export class ProjectService {
  private projectUrl = `api/projects`;  // URL to web api
  getAllProjects(): Observable<Project[]> {
    const url = `${this.projectUrl}/getAll`;
    return this.http.get<Project[]>(url).pipe(
      tap(_ => this.log(`fetched projects`)),
      catchError(this.handleError<Project[]>(`get all project`))
    );
  }
  getProject(id: number): Observable<Project> {
    const url = `${this.projectUrl}`;
    return this.http.get<Project>(url).pipe(
      tap(next => this.log(`fetched hero ${next}`)),
      catchError(this.handleError<Project>(`get all project`))
    );
  }
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
