//import * as PokemonActions from '@states/pokemon/pokemon.actions';
import * as UserActions from "../actions/user.actions";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap, exhaustMap } from "rxjs/operators";

import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  @Effect()
  loadAllUsers$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.LOAD_USERS),
    switchMap(() =>
      this.userService.getAll().pipe(
        map((users) => new UserActions.LoadUsersSuccess(users)),
        catchError((error) => of(new UserActions.LoadUsersFailed(error)))
      )
    )
  );

  @Effect()
  updateUser$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_USER),
    exhaustMap((action: UserActions.UpdateUser) =>
      this.userService.updateUser(action.payload).pipe(
        switchMap((user) => [
          //Todo ha ido bien, lanzamos una acción UPDATE_USER_SUCCESS
          new UserActions.UpdateUserSuccess(user),
          //.. y establecemos el usuario logado
          new UserActions.SetCurrentUser(user),
        ]),
        //Si no hemos podido logar al usurio, comprobamos si son credenciales de una empresa
        catchError((error) =>
          of(
            new UserActions.UpdateUserError(
              "No se ha podido realizar la actualización del usuario"
            )
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  updateUserSuccess$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_USER_SUCCESS),
    tap(() => this.router.navigate(["/uojobs/users/profile"]))
  );

  //Efectos relacionados con la formación gestión de la formación académica
  //-------------------------------------

  /** La ejecución de SET_CURRENT_STUDY implica dirigir la aplicación a la pantalla
   * que contiene el formulario de creacion/edicion de formación académica
   * dispatch = false porque no ejecutamos ninguna acción
   */
  @Effect({ dispatch: false })
  setCurrentStudy$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.SET_CURRENT_STUDY),
    tap(() => this.router.navigate(["/uojobs/users/edit-studies"]))
  );

  @Effect()
  createStudy$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_STUDY),
    switchMap((action: UserActions.CreateStudy) =>
      this.userService.addStudy(action.user, action.newStudy).pipe(
        map((user) => new UserActions.CreateStudySuccess(user)),
        catchError((error) => of(new UserActions.CreateStudyError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  createStudySuccess$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_STUDY),
    tap(() => this.router.navigate(["/uojobs/users/profile"]))
  );

  @Effect()
  updateStudy$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_STUDY),
    switchMap((action: UserActions.UpdateStudy) =>
      this.userService.editStudy(action.user, action.study).pipe(
        map((user) => new UserActions.UpdateStudySuccess(user)),
        catchError((error) => of(new UserActions.UpdateStudyError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateStudySuccess$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_STUDY_SUCCESS),
    tap(() => this.router.navigate(["/uojobs/users/profile"]))
  );

  @Effect()
  deleteStudy$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.DELETE_STUDY),
    switchMap((action: UserActions.DeleteStudy) =>
      this.userService.deleteStudies(action.user, action.study).pipe(
        map((user) => new UserActions.DeleteStudySuccess(user)),
        catchError((error) => of(new UserActions.DeleteStudyError(error)))
      )
    )
  );

  //En los error podriamos redirigir a una pantalla de error, mandar un mail al administrador,..

  //Efectos relacionados con la expriencia laboral
  //----------------------------------------------
  @Effect({ dispatch: false })
  setCurrentExperience$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.SET_CURRENT_EXPERIENCE),
    tap(() => this.router.navigate(["/uojobs/users/edit-experience"]))
  );

  @Effect()
  createExperience$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_EXPERIENCE),
    switchMap((action: UserActions.CreateExperience) =>
      this.userService.addExperience(action.user, action.newExperience).pipe(
        map((user) => new UserActions.CreateExperienceSuccess(user)),
        catchError((error) => of(new UserActions.CreateExperienceError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  createExperienceSuccess$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_EXPERIENCE_SUCCESS),
    tap(() => this.router.navigate(["/uojobs/users/profile"]))
  );

  @Effect()
  updateExperience$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_EXPERIENCE),
    switchMap((action: UserActions.UpdateExperience) =>
      this.userService.editExperience(action.user, action.experience).pipe(
        map((user) => new UserActions.UpdateExperienceSuccess(user)),
        catchError((error) => of(new UserActions.UpdateExperienceError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateExperienceSuccess$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_EXPERIENCE_SUCCESS),
    tap(() => this.router.navigate(["/uojobs/users/profile"]))
  );

  @Effect()
  deleteExperience$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.DELETE_EXPERIENCE),
    switchMap((action: UserActions.DeleteExperience) =>
      this.userService.deleteExperience(action.user, action.experience).pipe(
        map((user) => new UserActions.DeleteExperienceSuccess(user)),
        catchError((error) => of(new UserActions.DeleteExperienceError(error)))
      )
    )
  );

  //Efectos relacionados con los idiomas
  //----------------------------------------------

  //Junto a actualizar el store, la ejecucion de SET_CURRENT_LANGUAGE
  //provocará una redireccion de la aplicación a la pantalla de edicion
  //de idioma
  @Effect({ dispatch: false })
  setCurrentLanguage$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.SET_CURRENT_LANGUAGE),
    tap(() => this.router.navigate(["/uojobs/users/edit-languages"]))
  );

  @Effect()
  createLanguage$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_LANGUAGE),
    switchMap((action: UserActions.CreateLanguage) =>
      this.userService.addLanguage(action.user, action.newLanguage).pipe(
        map((user) => new UserActions.CreateLanguageSuccess(user)),
        catchError((error) => of(new UserActions.CreateLanguageError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  createLanguageSuccess$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.CREATE_LANGUAGE_SUCCESS),
    tap(() => this.router.navigate(["/uojobs/users/profile"]))
  );

  @Effect()
  updateLanguage$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_LANGUAGE),
    switchMap((action: UserActions.UpdateLanguage) =>
      this.userService.editLanguage(action.user, action.language).pipe(
        map((user) => new UserActions.UpdateLanguageSuccess(user)),
        catchError((error) => of(new UserActions.UpdateLanguageError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateLanguageSuccess$ = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.UPDATE_LANGUAGE_SUCCESS),
    tap(() => this.router.navigate(["/uojobs/users/profile"]))
  );

  @Effect()
  deleteLanguage$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.DELETE_LANGUAGE),
    switchMap((action: UserActions.DeleteLanguage) =>
      this.userService.deleteLanguaje(action.user, action.language).pipe(
        map((user) => new UserActions.DeleteLanguageSuccess(user)),
        catchError((error) => of(new UserActions.DeleteLanguageError(error)))
      )
    )
  );
}
