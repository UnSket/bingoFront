import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/observable';
import {forEach} from "@angular/router/src/utils/collection";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ApprenticeSheetService {
  public spinner = false;
  private projectUrl = `api/apprentice-sheets`;
  private data: {projectId: number, isAllSheets: boolean, sheets: {key: number, value: string}[][]}[] = [];

  addApprenticeSheet (projectId: number, count: number): Observable<number[]> {
    this.spinner = true;
    return this.http.put<number[]>(this.projectUrl + `/addApprenticeSheet?projectId=${projectId}&count=${count}`, projectId).pipe(
      tap(_ => this.log(`added apprentice to project with id=${projectId}`)),
      catchError(this.handleError<number[]>('addHero'))
    );
  }
  getApprenticeSheet (projectId: number, sheetId: number): Observable<{key: number, value: string}[][]> {
    const answer = this.data.filter(next => next.projectId === projectId)//.filter(next => next.sheets.filter())
    if (answer.length > 0) {
      return Observable.create(observer => observer.next(answer[0].sheets));
    } else {
      this.spinner = true;
      return this.http.get<{key: number, value: string}[][]>(this.projectUrl + `/getApprenticeSheet?projectId=${projectId}&sheetId=${sheetId}`).pipe(
        tap(next => {
          const sheets: {key: number, value: string}[][] = [];
          next.forEach( sheet => {
            sheets.push(sheet.slice(0));
          });
          this.data.push({projectId: projectId, isAllSheets: false, sheets: sheets.slice(0)});
          this.log(`fetched ${sheetId} apprenticeSheet from ${projectId} project`);
        }),
        catchError(this.handleError<{key: number, value: string}[][]>(`get apprenticeSheet`))
      );
    }
  }
  getApprenticeSheetCount(projectId): Observable<number[]> {
    this.spinner = true;
    return this.http.get<number[]>(this.projectUrl + `/getApprenticeSheetCount?projectId=${projectId}`).pipe(
      tap(next => this.log(`fetched apprenticeSheetCount for ${projectId} project`)),
      catchError(this.handleError<number[]>(`get apprentice sheet count`))
    );
  }
  changeWord(sheetId: number, wordId: number): Observable<string> {
    this.spinner = true;
    return this.http.post<string>(this.projectUrl + `/changeWord?sheetId=${sheetId}&wordId=${wordId}`, null).pipe(
      tap(next => this.log(`change word with id = ${wordId} in sheet with id = ${sheetId} on ${next}`)),
      catchError(this.handleError<string>(`get apprentice sheet count`))
    );
  }
  deleteSheet(sheetId: number): Observable<void> {
    this.spinner = true;
    return this.http.delete<void>(this.projectUrl + `/delete/${sheetId}`).pipe(
      tap(_ => this.log(`deleted sheet with id = ${sheetId}`)),
      catchError(this.handleError<void>(`get apprentice sheet count`))
    );
  }
  private log(message: string) {
    this.spinner = false;
    console.log('ApprenticeService: ' + message);
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
