/** /state/demo es una prueba de concepto únicamente destinada a asentar los conocimientos
 * de ngrx, trastear y echar a andar un ejemplo sencillo
 */

//Los efectos son lo que más trabajo me cuesta entender.
//Efectos son como una funcionalidad, método.. trozo de código que se ejecuta
//vinculado a una acción.

//Importante : efecto (vinculado a) Acción
//Que se lance una acción (con dispatch) puede implicar que se ejecuten sus efectos asociados

//En la practica, los efectos llaman a los servicios de negocio. Toda la lógica de dispatch, observar, etc de acciones
//es muy dummy y donde está la invocación al (o a los N) servicios de negocio es en los effectos

//Un efecto, a su vez, suele provocar el disparo de otras acciones, aunque no necesariamente tiene que ser así

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { from } from "rxjs";

import * as DemoActions from "../actions/demo.actions";
//La sintexis es terrible..

import { UserService } from "../../../services/user.service";

@Injectable()
export class DemoEffects {
  constructor(private actions$: Actions, private userService: UserService) {
    // podría inyectarle N servicios de negocio, p.ej: , private userService: UserService) {
    //O el objeto router
  }

  @Effect()
  efectoAccion1$: Observable<any> = this.actions$.pipe(
    ofType(DemoActions.DemoActionTypes.ACCION1), //Ojo, asociamos el efecto a la acción!
    //No se porque es un switchMap, intuyo que es cuando el servicio de negocio puede devolver varios tipos de observables?
    //devolvemos un observable random, con una lista de números

    switchMap(() =>
      this.getNumbers().pipe(
        map((x) => new DemoActions.Accion1OK(x)),
        catchError((error) => of(new DemoActions.Accion1OK(error)))
      )
    )
  );

  //https://stackoverflow.com/questions/54297317/angular-ngrx-effects-how-to-pass-a-parameter
  //pasar parametro

  @Effect()
  efectoaccion2$: Observable<any> = this.actions$.pipe(
    ofType(DemoActions.DemoActionTypes.ACCION2),
    //porque hay que usar una funcion como map o switchMap? Ver más ejemplos por ahí

    switchMap(() =>
      this.getDates().pipe(
        map((x) => new DemoActions.Accion2OK(x)),
        catchError((error) => of(new DemoActions.Accion2OK(error)))
      )
    )
  );

  @Effect()
  efectoaccion3$: Observable<any> = this.actions$.pipe(
    ofType(DemoActions.DemoActionTypes.ACCION3),
    switchMap(() =>
      this.userService.getAll().pipe(
        map((users) => new DemoActions.Accion3OK(users)),
        catchError((error) => of(new DemoActions.Accion3OK(error)))
      )
    )
  );

  //Métodos de apoyo que devuelven observables de prueba, en la practica
  //se llamarán a servicios de negocio, apis rest externas, etc
  getNumbers(): Observable<number[]> {
    console.log("--> se invoca a getNumeros");
    return from([[1, 2, 3, 4, 5]]);
  }

  getDates(): Observable<Date[]> {
    console.log("--> ejecutando getDates()");
    return from([[new Date(), new Date(), new Date()]]);
  }
}
