import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Company } from "../models/company.model";
import { Language } from "../models/language.model";
import { DataService } from "./data.service";
import { tap, catchError, map, filter, flatMap } from "rxjs/operators";
import { Experience } from "../models/experience.model";
import { Study, CollegeStudy, VocationalStudy } from "../models/study.model";

@Injectable({
  providedIn: "root"
})
/* Servicio de negocio encargado de la gestion de empresa (anologa al de usuarios) */
export class CompanyService {
  //Empresa autenticada en la aplicacion
  private _company: Company;
  private _token: string = null;
  private _companyName: string = null;

  //Inyectamos el servicio de negocio necesario para invocar al fake-backend
  constructor(private dataservice: DataService) {}

  /** Realiza el login de empresa contra el fake-backend */
  //TODO: ESTO YA NO SE UTILIZA, SE PODRÁ ELIMINAR EN EL REFACT FINAL
  login(email: string, password: string): Observable<Company[]> {
    //obtiene un observable con todos las empresas y posteriormente filtra por usuario/password
    return this.dataservice
      .getCompanies()
      .pipe(
        map(usuarios =>
          usuarios.filter(u => u.username == email && u.password == password)
        )
      );
  }

  loginCompany(email: string, password: string): Observable<Company> {
    //obtiene un observable con todos las empresas y posteriormente filtra por usuario/password
    return this.dataservice.getCompanies().pipe(
      flatMap(empresas => {
        let emp = empresas.filter(
          u => u.email == email && u.password == password
        );
        if (emp && emp.length == 1) {
          return emp;
        } else {
          return throwError("Email o contraseña no válidos");
        }
      })
    );
  }

  /** Actualiza el usuario con los nuevos datos tras la edicion del perfil*/
  updateCompany(company: Company): Observable<Company> {
    //actualizamos el usuario que tiene almacenado el servicio
    this._company = company;
    //llamamos al backend para persistir en BBDD
    return this.dataservice.updateCompany(this._company);
  }

  /** Realiza el logout de la aplicacion, borrando los atributos y el localStorage */
  //TODO: ESTO YA NO SE UTILIZA, SE PODRÁ ELIMINAR EN EL REFACT FINAL
  clear() {
    this._token = null;
    window.localStorage.removeItem("token");
    this._companyName = null;
    window.localStorage.removeItem("companyName");
    this._company = null;
    window.localStorage.removeItem("company");
  }

  /** true si tenemos un usuario logado y false en caso contrario */
  //TODO: ESTO YA NO SE UTILIZA, SE PODRÁ ELIMINAR EN EL REFACT FINAL
  isLoggedIn() {
    if (window.localStorage.getItem("token") != null) {
      this._token = window.localStorage.getItem("token");
      this._companyName = window.localStorage.getItem("companyName");
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

  set companyName(companyName: string) {
    this._companyName = companyName;
    window.localStorage.setItem("companyName", companyName);
  }

  get companyName() {
    return this._companyName;
  }

  set company(company: Company) {
    console.log("-- llamando al set company");
    this._company = company;
    window.localStorage.setItem("company", JSON.stringify(company));
  }

  get company() {
    if (!this._company && window.localStorage.getItem("company")) {
      this._company = JSON.parse(window.localStorage.getItem("company"));
    }
    return this._company;
  }
}
