import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ApprenticeSheetService {
  private projectUrl = `api/apprentice-sheets`;  // URL to web api
  addApprenticeSheet (projectId: number, count: number): Observable<number[]> {
    return this.http.post<number[]>(this.projectUrl + `/addApprenticeSheet?projectId=${projectId}&count=${count}`, projectId).pipe(
      tap(_ => this.log(`added apprentice to project with id=${projectId}`)),
      catchError(this.handleError<number[]>('addHero'))
    );
  }
  getApprenticeSheet (projectId: number, sheetId: number): Observable<string[][]> {
    return this.http.get<string[][]>(this.projectUrl + `/getApprenticeSheet?projectId=${projectId}&sheetId=${sheetId}`).pipe(
      tap(next => this.log(`fetched ${sheetId} apprenticeSheet from ${projectId} project`)),
      catchError(this.handleError<string[][]>(`get apprenticeSheet`))
    );
  }
  getApprenticeSheetCount(projectId): Observable<number[]>{
    return this.http.get<number[]>(this.projectUrl + `/getApprenticeSheetCount?projectId=${projectId}`).pipe(
      tap(next => this.log(`fetched apprenticeSheetCount for ${projectId} project`)),
      catchError(this.handleError<number[]>(`get apprentice sheet count`))
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
