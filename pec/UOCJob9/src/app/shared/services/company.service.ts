import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Company } from "../models/company.model";
import { DataService } from "./data.service";
import { tap, catchError, map, flatMap } from "rxjs/operators";
import { cloneDeep } from "lodash";

@Injectable({
  providedIn: "root",
})
/* Servicio de negocio encargado de la gestion de empresa (anologa al de usuarios) */
export class CompanyService {
  //Inyectamos el servicio de negocio necesario para invocar al fake-backend
  constructor(private dataservice: DataService) {}

  /** Realiza el login de empresa contra el fake-backend */
  loginCompany(email: string, password: string): Observable<Company> {
    //obtiene un observable con todos las empresas y posteriormente filtra por usuario/password
    return this.dataservice.getCompanies().pipe(
      flatMap((empresas) => {
        let emp = empresas.filter(
          (u) => u.email == email && u.password == password
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
    const companyToUpdate = cloneDeep(company);
    //llamamos al backend para persistir en BBDD
    return this.dataservice.updateCompany(companyToUpdate);
  }
}
