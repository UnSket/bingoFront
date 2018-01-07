import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Project} from './model/Project';
import {WordGroup} from './model/Group';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
  addGroup (id: number, group: WordGroup): Observable<WordGroup> {
    return this.http.post<WordGroup>(this.projectUrl + `/addGroup?id=${id}`, { name: group.name, others: group.others }).pipe(
      tap(_ => this.log(`added group id=${group.name}`)),
      catchError(this.handleError<WordGroup>('addGroup'))
    );
  }
  removeGroup (id: number): Observable<WordGroup> {
    return this.http.delete<WordGroup>(this.projectUrl + `/removeGroup?id=${id}`).pipe(
      tap(_ => this.log(`remove group ${id}`)),
      catchError(this.handleError<WordGroup>('remove group'))
    );
  }
  updateGroup (group: WordGroup): Observable<WordGroup> {
    return this.http.put<WordGroup>(this.projectUrl + `/updateGroup`, group).pipe(
      tap(_ => this.log(`update group ${group.id}`)),
      catchError(this.handleError<WordGroup>('remove group'))
    );
  }
  addApprenticeSheet (projectId: number) : Observable<string> {
    return this.http.post<string>(this.projectUrl + `/addApprenticeSheet?projectId=${projectId}`, projectId).pipe(
      tap(_ => this.log(`added apprentice to project with id=${projectId}`)),
      catchError(this.handleError<string>('addHero'))
    );
  }
  getApprenticeSheet (projectId: number, sheetId: number): Observable<string[]> {
    return this.http.get<string[]>(this.projectUrl + `/getApprenticeSheet?projectId=${projectId}&sheetId=${sheetId}`).pipe(
      tap(next => this.log(`fetched ${sheetId} apprenticeSheet from ${projectId} project`)),
      catchError(this.handleError<string[]>(`get apprenticeSheet`))
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
