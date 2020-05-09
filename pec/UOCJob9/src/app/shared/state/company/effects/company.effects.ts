import * as CompanyActions from "../actions/company.actions";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap, exhaustMap } from "rxjs/operators";

import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { Company } from "../../../models/company.model";
import { CompanyService } from "../../../services/company.service";

@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private router: Router
  ) {}

  @Effect()
  updateCompany$: Observable<any> = this.actions$.pipe(
    ofType(CompanyActions.CompanyActionTypes.UPDATE_COMPANY),
    exhaustMap((action: CompanyActions.UpdateCompany) =>
      this.companyService.updateCompany(action.payload).pipe(
        switchMap((company) => [
          //Todo ha ido bien, lanzamos una acción UPDATE_COMPANY_SUCCESS
          new CompanyActions.UpdateCompanySuccess(company),
          //.. y establecemos el usuario logado
          new CompanyActions.SetCurrentCompany(company),
        ]),
        //Si no hemos podido logar al usurio, comprobamos si son credenciales de una empresa
        catchError((error) =>
          of(
            new CompanyActions.UpdateCompanyError(
              "No se ha podido realizar la actualización de la empresa"
            )
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  updateCompanySuccess$ = this.actions$.pipe(
    ofType(CompanyActions.CompanyActionTypes.UPDATE_COMPANY_SUCCESS),
    tap(() => this.router.navigate(["/companies/dashboard"]))
  );

  @Effect()
  loadComanies$: Observable<any> = this.actions$.pipe(
    ofType(CompanyActions.CompanyActionTypes.LOAD_COMPANIES),
    switchMap(() =>
      this.companyService.getAll().pipe(
        map((cs) => new CompanyActions.LoadCompaniesSuccess(cs)),
        catchError((error) => of(new CompanyActions.LoadCompaniesError(error)))
      )
    )
  );
}
