import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { User } from "../models/user.model";
import { Offer } from "../models/offer.model";

@Injectable({
  providedIn: "root"
})
/** Realiza las llamadas al fake-backend.
 * Tenemos configurado el in-memory-service para que intercepte las llamadas y devuelva datos
 * de la base de datos en memoria
 */
export class DataService {
  apiurl_users = "api/users";
  apiurl_offers = "api/offers";
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) {}

  //Funcion para manejar los errores
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  /** Devuelve todos los usuarios de la BBDD realizando una llamada al backend */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiurl_users).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  /** Devuelve el usuario cuyo identificador se pasa como parametro */
  getUser(id: number): Observable<User> {
    const url = `${this.apiurl_users}/${id}`;
    return this.http.get<User>(url).pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<User> {
    user.id = null;
    return this.http.post<User>(this.apiurl_users, user, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  /* Actualiza en el backend en el usuario que se pasa como parametro */
  updateUser(user: User): Observable<User> {
    const url = `${this.apiurl_users}/${user.id}`;
    return this.http.put<User>(this.apiurl_users, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  /** Obtiene todas las ofertas definidas en nuestra BBDD de prueba */
  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiurl_offers).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  /** Devuelve la oferta cuyo identificador se pasa como parametro */
  getOffer(id: number): Observable<Offer> {
    const url = `${this.apiurl_offers}/${id}`;
    return this.http.get<Offer>(url).pipe(catchError(this.handleError));
  }
}
