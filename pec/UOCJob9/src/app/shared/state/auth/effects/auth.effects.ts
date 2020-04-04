/** Con los efectos invocaremos a la lógica de negocio relacionada con la autenticación cuando se
 * disparen alguna de las acciones definidas
 */

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { from } from "rxjs";

import * as AuthActions from "../actions/auth.actions";
import { UserService } from "../../../services/user.service";
import { CompanyService } from "../../../services/company.service";

@Injectable()
export class AuthEffects {
  //Inyectaremos el servicio de usuarios para hacer el login contra el 'backend'
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private companyService: CompanyService
  ) {}

  //Pasamos parametros a la acción de login, visto en:
  //https://stackoverflow.com/questions/54297317/angular-ngrx-effects-how-to-pass-a-parameter

  @Effect()
  loginUser$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_USER),
    switchMap((action: AuthActions.LoginUser) =>
      this.userService.loginUser(action.email, action.password).pipe(
        map(user => new AuthActions.LoginUserSuccess(user)), //Todo ha ido bien, lanzamos una acción LOGIN_USER_SUCCESS
        //Si no hemos podido logar al usurio, comprobamos si son credenciales de una empresa
        catchError(error =>
          of(new AuthActions.LoginCompany(action.email, action.password))
        )
      )
    )
  );

  @Effect()
  loginCompany$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_COMPANY),
    switchMap((action: AuthActions.LoginCompany) =>
      this.companyService.loginCompany(action.email, action.password).pipe(
        map(company => new AuthActions.LoginCompanySuccess(company)),
        catchError(error => of(new AuthActions.LoginCompanyError(error)))
      )
    )
  );
}
