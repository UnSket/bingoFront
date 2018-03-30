import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Project} from '../model/Project';
import {User} from '../model/User';

@Injectable()
export class UserService {

  private userUrl = `api/user`;  // URL to web api
  public spinner = false;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getUser(): Observable<User> {
    this.spinner = true;
    return this.http.get<User>(this.userUrl + `/info` ).pipe(
      tap(next => this.log(`fetched user ${next.login}`)),
      catchError(this.handleError<User>(`catch user`))
    );
  }
  /*addProject (project: string): Observable<string> {
    this.spinner = true;
    return this.http.post<string>(this.projectUrl + `?name=${project}`, project).pipe(
      tap(_ => this.log(`added project id=${project}`)),
      catchError(this.handleError<string>('addHero'))
    );
  }
  copyProject (oldProjectId: number, newProjectName: string): Observable<Project> {
    this.spinner = true;
    return this.http.post<Project>(this.projectUrl + `/copyProject?oldProjectId=${oldProjectId}&newProjectName=${newProjectName}`, null).pipe(
      tap(project => this.log(`copy project id=${project.id}`)),
      catchError(this.handleError<Project>('copyProject'))
    );
  }
  deleteProject(projectId: number): Observable<string> {
    this.spinner = true;
    return this.http.delete<string>(this.projectUrl + `/delete-project?id=${projectId}`).pipe(
      tap(_ => this.log(`delete project with id=${projectId}`)),
      catchError(this.handleError<string>('deleteProject'))
    );
  }*/
  private log(message: string) {
    this.spinner = false;
    console.log('ProjectService: ' + message);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
        this.router.navigate(['/welcome/login']);
      }
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
