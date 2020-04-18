import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import * as AuthActions from "../actions/auth.actions";
import * as UserActions from "../../user/actions/user.actions";
import * as CompanyActions from "../../company/actions/company.actions";
import { UserService } from "../../../services/user.service";
import { CompanyService } from "../../../services/company.service";
import { Router } from "@angular/router";

/**
 * Con los efectos invocaremos a la lógica de negocio relacionada con la autenticación cuando se
 * disparen alguna de las acciones definidas
 */

@Injectable()
export class AuthEffects {
  //Inyectaremos el servicio de usuarios para hacer el login contra el 'backend'
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  //Pasamos parametros a la acción de login, visto en:
  //https://stackoverflow.com/questions/54297317/angular-ngrx-effects-how-to-pass-a-parameter

  /** Intenta relizar el login contra el backend, despachando la acción adecuada en base a la respuesta
   * que se obtenga del servicio de negocio
   */
  @Effect()
  loginUser$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_USER),
    switchMap((action: AuthActions.LoginUser) =>
      this.userService.loginUser(action.email, action.password).pipe(
        switchMap((user) => [
          //Todo ha ido bien, lanzamos una acción LOGIN_USER_SUCCESS
          //(lo que nos llevará al dashboard)
          new AuthActions.LoginUserSuccess(user),
          //.. y establecemos el usuario logado
          new UserActions.SetCurrentUser(user),
        ]),
        //Si no hemos podido logar al usurio, comprobamos si son credenciales de una empresa
        catchError((error) =>
          of(new AuthActions.LoginCompany(action.email, action.password))
        )
      )
    )
  );

  //Nota sobre el efecto anterior:
  //En vez de ejecutar las 2 acciones tras el loginUser..
  //Otra posible implementación de lo anterior es implementar
  ///un efecto asociado a LoginUserSuccess para despachar SetCurrentUser

  /** Invoca al backend para intentar hacer un login de una empresa */
  @Effect()
  loginCompany$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_COMPANY),
    switchMap((action: AuthActions.LoginCompany) =>
      this.companyService.loginCompany(action.email, action.password).pipe(
        switchMap((company) => [
          //El backend nos ha logado, establecemos empresa y nos vamos al dashboard
          new AuthActions.LoginCompanySuccess(company),
          new CompanyActions.SetCurrentCompany(company),
        ]),
        catchError((error) => of(new AuthActions.LoginCompanyError(error)))
      )
    )
  );

  //En un ejemplo real, habría que hacer logout contra el backend
  @Effect()
  logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT),
    switchMap((action: AuthActions.LoginUser) =>
      //No llamamos a ningún backend. Supondremos que el backend nos devolvería
      //un observable con la información de logout. En este caso, creamos un observable
      //vacío con of()..
      of({}).pipe(
        switchMap(() => [
          new AuthActions.LogoutSuccess(),
          //Limpiamos la información del usuario logado
          //de nuestro store invocando a setCurrentUser con null
          new UserActions.SetCurrentUser(null),
        ]),
        catchError((error) => of(new AuthActions.LogoutError(error)))
      )
    )
  );

  //Si el logout ha ido bien, redirigimos la aplicación de nuevo a la pantalla de login
  @Effect({ dispatch: false })
  logoutSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT_SUCCESS),
    tap(() => this.router.navigate(["/signin"]))
  );

  //Efectos relacionados con recordar la contraseña:

  //Si se lanza una acción para recordar la contraseña, acudiremos al backend
  //buscando el usuario con ese email. Si dicho usuario no tiene ninguna petición
  //de recuperación pendiente, le mandamos un email (invoando a la acción oportuna)
  //En caso contrario (tiene un petición de recuperación pdte), lanzamos otra acción
  //pa informar al usuario de ello.

  @Effect()
  rememberPassword$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REMEMBER_PASSWORD),
    switchMap((action: AuthActions.RememberPassword) =>
      this.userService.findByEmail(action.email).pipe(
        map((user) => {
          if (user.recover_request_pending) {
            //El usuario tiene una petición ya pendiente
            return new AuthActions.RememberPasswordAlreadySent(user);
            //Nota, estas peticiones pendientes tendrían que caducar en un entorno real..
          } else {
            return new AuthActions.RememberPasswordSend(user);
          }
        }),
        catchError((error) => of(new AuthActions.RememberPasswordError(error)))
      )
    )
  );

  //Nota sobre el efecto anterior: realmente no sé si este sería el comportamiento real en una aplicación
  //ya que con este conjunto de acciones un usuario 'malicioso' podría saber si un email está
  //registrado o no en la web, si ha pedido un restablecimiento de contraseña.. bueno, entiendo que no
  //ni mucho menos relevante para la Pec :

  //Invoca al servicio de negocio para enviar un email 'fake'
  @Effect()
  rememberPasswordSend$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REMEMBER_PASSWORD_SEND),
    switchMap((action: AuthActions.RememberPasswordSend) =>
      this.userService.sendRememberPasswordMail(action.user).pipe(
        map((user) => new AuthActions.RememberPasswordSendSuccess(user)),
        catchError((error) => of(new AuthActions.RememberPasswordError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  rememberPassClear$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REMEMBER_PASSWORD_CLEAR),
    tap(() => this.router.navigate(["/signin"]))
  );
}
