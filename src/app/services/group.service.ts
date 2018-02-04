import { Injectable } from '@angular/core';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {WordGroup} from '../model/Group';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GroupService {
  private projectUrl = `api/groups`;  // URL to web api
  public spinner = false;
  constructor( private http: HttpClient ) { }

  getGroups(id: number) {
    this.spinner = true;
    return this.http.get<WordGroup[]>(this.projectUrl + `/getGroups?id=${id}` ).pipe(
      tap(next => this.log(`fetched all groups`)),
      catchError(this.handleError<WordGroup[]>(`get all project`))
    );
  }
  addGroup (id: number, group: WordGroup): Observable<WordGroup> {
    this.spinner = true;
    return this.http.post<WordGroup>(this.projectUrl + `/addGroup?id=${id}`, { name: group.name, others: group.others }).pipe(
      tap(_ => this.log(`added group id=${group.name}`)),
      catchError(this.handleError<WordGroup>('addGroup'))
    );
  }
  removeGroup (id: number): Observable<WordGroup> {
    this.spinner = true;
    return this.http.delete<WordGroup>(this.projectUrl + `/removeGroup?id=${id}`).pipe(
      tap(_ => this.log(`remove group ${id}`)),
      catchError(this.handleError<WordGroup>('remove group'))
    );
  }
  updateGroup (group: WordGroup): Observable<WordGroup> {
    this.spinner = true;
    return this.http.put<WordGroup>(this.projectUrl + `/updateGroup`, group).pipe(
      tap(_ => this.log(`update group ${group.id}`)),
      catchError(this.handleError<WordGroup>('remove group'))
    );
  }
  private log(message: string) {
    this.spinner = false;
    console.log('GroupService: ' + message);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
