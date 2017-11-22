import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Project} from './model/Project';
import {WordGroup} from "./model/Group";


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
    return this.http.get<Project>(this.projectUrl + `?id=${id}` ).pipe(
      tap(next => this.log(`fetched project ${next.name}`)),
      catchError(this.handleError<Project>(`get all project`))
    );
  }
  addProject (project: string): Observable<string> {
    return this.http.post<string>(this.projectUrl + `?name=${project}`, project).pipe(
      tap(_ => this.log(`added project id=${project}`)),
      catchError(this.handleError<string>('addHero'))
    );
  }
  getGroups(id: number) {
    return this.http.get<WordGroup[]>(this.projectUrl + `/getGroups?id=${id}` ).pipe(
      tap(next => this.log(`fetched all groups`)),
      catchError(this.handleError<WordGroup[]>(`get all project`))
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
