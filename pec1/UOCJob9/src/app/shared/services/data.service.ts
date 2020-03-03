import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiurl = 'api/users';                 // Our created Data can be accessed here at api/users
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }                     //Injecting HTTP service to communicate with the data

  private handleError(error: any) {
    console.error(error);                                       //Created a function to handle and log errors, in case
    return throwError(error);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiurl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getUser (id: number): Observable<User> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<User>(url).pipe(
    catchError(this.handleError)
    );
    }

    addUser (user: User): Observable<User> { 
        user.id=null;
        return this.http.post<User>(this.apiurl, user, this.httpOptions).pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
    }

    updateUser(user: User): Observable<User>{
        const url = `${this.apiurl}/${user.id}`;
        return this.http.put<User>(this.apiurl, user, this.httpOptions).pipe(
          map(() => user),
          catchError(this.handleError)
        );
      }

      deleteCar (id: number): Observable<User> {
        const url = `${this.apiurl}/${id}`;
        return this.http.delete<User>(url, this.httpOptions).pipe(
          catchError(this.handleError)
        );
      }

}