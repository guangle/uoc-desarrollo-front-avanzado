import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Language } from "../models/language.model";
import { DataService } from "./data.service";
import {
  tap,
  catchError,
  map,
  filter,
  first,
  take,
  flatMap,
} from "rxjs/operators";
import { Experience } from "../models/experience.model";
import { Study, CollegeStudy, VocationalStudy } from "../models/study.model";

//Usamos una librería para copiar los objetos
//He tenido algunos problemas manipulando los parámetros en algunos métodos del servicio,
//(por ejemplo, añadiendo una experiencia al usuario que se pasa como parámetro)
//No sé exactamente si es porque el usuario es un parámetro y no se puede extender o porque
//procede de un selector ngrx y este obtiene una copia de solo lectura del store.
//En cualquier caso, en ocasiones, para setear atributos y mandarlo al backend modificado hago una copia del
//objeto. No he utilizado el operador spread ... porque no hace una copia 'profunda' del objeto.
//Otra aproximación fue el 'truco' de convertirlo a json y despues devolverlo a objeto :
// let userToUpdate = JSON.parse(JSON.stringify(us)); pero leí que podía dar problemas con algún tipo determinado de atributos,
// como fechas. Finalmente use la librería lodash que provee el método cloneDeep con el que podemos hacer una copia exacta de
//un objeto y todos sus atributos.
import { cloneDeep } from "lodash";

@Injectable({
  providedIn: "root",
})
/* Servicio de negocio encargado de la gestion de usuarios */
export class UserService {
  //El servicio almacena una copia del usuario autenticado en la aplicación
  private _user: User;
  private _token: string = null;
  private _userName: string = null;

  //Inyectamos el servicio de negocio necesario para invocar al fake-backend
  constructor(private dataservice: DataService) {}

  /** Realiza el login contra el fake-backend */
  //TODO: ESTO YA NO SE UTILIZA, SE PODRÁ ELIMINAR EN EL REFACT FINAL
  /*
  login(email: string, password: string): Observable<User[]> {
    //obtiene un observable con todos los usuarios y posteriormente filtra por usuario/password
    return this.dataservice
      .getUsers()
      .pipe(
        map((usuarios) =>
          usuarios.filter((u) => u.email == email && u.password == password)
        )
      );
  }
  */

  /** Realiza el login contra el fake-backend */
  loginUser(email: string, password: string): Observable<User> {
    //obtiene un observable con todos los usuarios y posteriormente filtra por usuario/password
    return this.dataservice.getUsers().pipe(
      flatMap((usuarios) => {
        let usus = usuarios.filter(
          (u) => u.email == email && u.password == password
        );
        if (usus && usus.length == 1) {
          return usus;
        } else {
          //no hay ningun usuario que coincida, devolvemos un error
          return throwError("Email o contraseña no válidos");
        }
      })
    );
  }

  /** Actualiza el usuario con los nuevos datos tras la edicion del perfil*/
  updateUser(user: User): Observable<User> {
    //actualizamos el usuario
    this._user = user;
    //llamamos al backend para persistir en BBDD
    return this.dataservice.updateUser(this.user);
  }

  addLanguage(us: User, lang: Language): Observable<User> {
    const userToUpdate = cloneDeep(us);
    userToUpdate.languages.push(lang);
    return this.dataservice.updateUser(userToUpdate);
  }

  editLanguage(us: User, lang: Language): Observable<User> {
    const userToUpdate = cloneDeep(us);
    //TODO: implementacion rapida y poco optima..
    //..pero no estamos usando un backend de verdad
    userToUpdate.languages = userToUpdate.languages.filter(
      (l) => l.uid != lang.uid
    );
    return this.addLanguage(userToUpdate, lang);
  }

  /** Elimina el lenguaje 'lang' del usuario 'us' */
  deleteLanguaje(us: User, lang: Language): Observable<User> {
    const userToUpdate = cloneDeep(us);
    userToUpdate.languages = userToUpdate.languages.filter(
      (l) => l.uid != lang.uid
    );
    return this.dataservice.updateUser(userToUpdate);
  }

  addExperience(us: User, exp: Experience): Observable<User> {
    const userToUpdate = cloneDeep(us);
    userToUpdate.experiencies.push(exp);
    return this.dataservice.updateUser(userToUpdate);
  }

  editExperience(us: User, exp: Experience): Observable<User> {
    const userToUpdate = cloneDeep(us);
    //TODO: implementacion rapida y poco optima..
    //..pero no estamos usando un backend de verdad
    userToUpdate.experiencies = userToUpdate.experiencies.filter(
      (l) => l.uid != exp.uid
    );
    return this.addExperience(userToUpdate, exp);
  }

  /** Elimina la experiencia 'exp' del usuario 'us' */
  deleteExperience(us: User, exp: Experience): Observable<User> {
    //Realizamos una copia del parametro
    let userToUpdate = JSON.parse(JSON.stringify(us));
    userToUpdate.experiencies = userToUpdate.experiencies.filter(
      (l) => l.uid != exp.uid
    );
    return this.dataservice.updateUser(userToUpdate);
  }

  //Estudios

  addStudy(us: User, st: Study): Observable<User> {
    //Creamos una copia del objeto para extenderla
    let userToUpdate = JSON.parse(JSON.stringify(us));
    userToUpdate.studies.push(st);
    return this.dataservice.updateUser(userToUpdate);
  }

  /* Actualiza el estudio que se pasa como parametro en el usuario logado */
  editStudy(us: User, st: Study): Observable<User> {
    //TODO: implementacion rapida y poco optima..
    //..pero no estamos usando un backend de verdad

    let userToUpdate = JSON.parse(JSON.stringify(us));
    userToUpdate.studies = userToUpdate.studies.filter((l) => l.uid != st.uid);
    return this.addStudy(userToUpdate, st);
  }

  /** Elimina la formacion cuyo id se pasa como parametro y devuelve un observable
   * que tendrá el usuario resultante
   */
  //TODO: VOLVER A COMENTAR
  deleteStudies(us: User, st: Study): Observable<User> {
    let userToUpdate = JSON.parse(JSON.stringify(us));
    userToUpdate.studies = userToUpdate.studies.filter((l) => l.uid != st.uid);
    return this.dataservice.updateUser(userToUpdate);
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

  getAll(): Observable<User[]> {
    //obtiene un observable con todos los usuarios y posteriormente filtra por usuario/password
    return this.dataservice.getUsers();
  }

  //Todo este códig es ya obsoleto y creo que se puede eliminar
  /*
    
    */
}
