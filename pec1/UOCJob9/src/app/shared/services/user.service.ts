import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { throwError as ObservableThrow } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';
import { DataService } from './data.service';
import { tap, catchError, map, filter } from 'rxjs/operators';
 
@Injectable({
  providedIn: "root"
})
/* Servicio de negocio encargado de encapsular las llamadas al servidor relativas a usuarios en la aplicacion */
export class UserService {
  

    private _user: User;
    private _token: string = null;
    private _userName : string = null;

    set token(token: string) {
        this._token = token;
        //Ejercicio 2.4: adicionalmente, almacenamos en el localStorage
        window.localStorage.setItem('token', token);
      }
    
      get token() {
        return this._token;
      }
    
      set userName(userName:string) {
        this._userName = userName;
        window.localStorage.setItem('userName', userName);
      }
    
      get userName() {
        return this._userName;
      }

      set user(user:User) {
        this._user = user;
      }
    
      get user() {
        return this._user;
      }

  //inyectamos en el constructor el servicio para realizar llamadas http
  //y el servicio donde almacenaremos el token de usuario
  constructor(private http: HttpClient, private dataservice : DataService) {}

  login(email: string, password: string): Observable<User[]> {
    return this.dataservice.getUsers().pipe(
        //filter(u => u.email == email && u.password == password)
        map(usuarios => usuarios.filter( u => u.email == email && u.password == password ))
    );
  }

  
}
