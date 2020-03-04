import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { throwError as ObservableThrow } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { DataService } from "./data.service";
import { tap, catchError, map, filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
/* Servicio de negocio encargado de la gestion de usuarios */
export class UserService {
  //TODO jjgr comentar esto

  private _user: User;
  private _token: string = null;
  private _userName: string = null;

  //Inyectamos el servicio de negocio necesario para invocar al fake-backend
  constructor(private dataservice: DataService) {}

  /** Realiza el login contra el fake-backend */
  login(email: string, password: string): Observable<User[]> {
    //obtiene un observable con todos los usuarios y posteriormente filtra por usuario/password
    return this.dataservice.getUsers().pipe(
      map(usuarios =>
        usuarios.filter(u => u.email == email && u.password == password)
      )
    );
  }

  /** Realiza el logout de la aplicacion, borrando los atributos y el localStorage */
  clear() {
    this._token = null;
    window.localStorage.removeItem("token");
    this._userName = null;
    window.localStorage.removeItem("userName");
    this._user = null;
    window.localStorage.removeItem("user");
  }

  /** true si tenemos un usuario logado y false en caso contrario */
  isLoggedIn() {
    if (window.localStorage.getItem("token") != null) {
      this.token = window.localStorage.getItem("token");
      this.userName = window.localStorage.getItem("userName");
    }
    return this.token != null;
  }

  //Getters y setters
  set token(token: string) {
    this._token = token;
    //Adicionalmente, almacenamos en el localStorage
    window.localStorage.setItem("token", token);
  }

  get token() {
    return this._token;
  }

  set userName(userName: string) {
    this._userName = userName;
    window.localStorage.setItem("userName", userName);
  }

  get userName() {
    return this._userName;
  }

  set user(user: User) {
    console.log("-- llamando al set user");
    this._user = user;
    window.localStorage.setItem("user", JSON.stringify(user));
  }

  get user() {
    if (!this._user && window.localStorage.getItem("user")) {
      this._user = JSON.parse(window.localStorage.getItem("user"));
    }
    return this._user;
  }
}
