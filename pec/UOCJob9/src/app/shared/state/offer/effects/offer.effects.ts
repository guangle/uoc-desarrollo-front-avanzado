import * as OfferActions from "../actions/offer.actions";
import * as UserActions from "../../user/actions/user.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap, filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../../services/data.service";
import { UserService } from "../../../services/user.service";

@Injectable()
export class OfferEffects {
  constructor(
    private actions$: Actions,
    private dataservice: DataService,
    private userService: UserService,
    private router: Router
  ) {}

  /** Realiza una llamada al fake-backend para cargar todas las ofertas para el usuario */
  @Effect()
  loadOffers$: Observable<any> = this.actions$.pipe(
    ofType(OfferActions.OfferActionTypes.LOAD_OFFERS),
    switchMap((action: OfferActions.LoadOffers) =>
      this.dataservice.getOffers().pipe(
        //Filtramos las ofertas para pasar al success solo
        //aquellas compatibles con la formación del usuario
        map(
          (offers) =>
            new OfferActions.LoadOffersSuccess(
              offers.filter((o) =>
                o.title
                  .map((t) => t.name)
                  .some((nombre) =>
                    action.user.studies
                      .map((s) => s.title.name)
                      .includes(nombre)
                  )
              )
            )
        ),
        catchError((error) => of(new OfferActions.LoadOffersError(error)))
      )
    )
  );

  /** La ejecución de SET_CURRENT_OFFER implica dirigir la aplicación a la pantalla
   * que contiene el formulario de visualización de oferta, donde el usuario podrá
   * inscribirse o des-inscribirse.
   * dispatch = false porque no ejecutamos ninguna acción
   */
  @Effect({ dispatch: false })
  setCurrentOffer$ = this.actions$.pipe(
    ofType(OfferActions.OfferActionTypes.SET_CURRENT_OFFER),
    tap(() => this.router.navigate(["/admin/offers/detail"]))
  );

  /** Efecto asociado a la acción que carga las ofertas a las que se ha inscrito el usuario */
  @Effect()
  loadUserOffers$: Observable<any> = this.actions$.pipe(
    ofType(OfferActions.OfferActionTypes.LOAD_USER_OFFERS),
    switchMap((action: OfferActions.LoadUserOffers) =>
      of(action.user?.offers).pipe(
        map((offers) => new OfferActions.LoadUserOffersSuccess(offers)),
        catchError((error) => of(new OfferActions.LoadUserOffersError(error)))
      )
    )
  );

  /** Efecto que se disparará cuando el usuario se apunte a una oferta:
   * llama al servicio de negocio para actualizar el back, y si todo va bien
   * actualiza el store de ofertas y el de usuarios (llamando a 2 acciones que
   * provocarán esa actualización)
   */
  @Effect()
  applyOffer$: Observable<any> = this.actions$.pipe(
    ofType(OfferActions.OfferActionTypes.APPLY_OFFER),
    switchMap((action: OfferActions.ApplyOffer) =>
      this.userService.applyOffer(action.user, action.offer).pipe(
        switchMap((user) => [
          //Lanzamos ApplyOfferSuccess para actualizar las ofertas
          //a las que se ha inscrito el usuario
          new OfferActions.ApplyOfferSuccess(user.offers),
          //.. y actualizaremos el usuario actual
          new UserActions.SetCurrentUser(user),
        ]),
        catchError((error) => of(new OfferActions.ApplyOfferError(error)))
      )
    )
  );

  /** Si todo va bien al inscribirse a la oferta, se redirigirá
   * a la pantalla principal. Este efecto no produce la invocación
   * de ninguna acción
   */
  @Effect({ dispatch: false })
  applyOfferSuccess$ = this.actions$.pipe(
    ofType(OfferActions.OfferActionTypes.APPLY_OFFER_SUCCESS),
    tap(() => this.router.navigate(["/admin/dashboard"]))
  );

  @Effect()
  cancelApplyOffer$: Observable<any> = this.actions$.pipe(
    ofType(OfferActions.OfferActionTypes.CANCEL_APPLY_OFFER),
    switchMap((action: OfferActions.CancelApplyOffer) =>
      this.userService.cancelApplyOffer(action.user, action.offer).pipe(
        switchMap((user) => [
          //Lanzamos CancelApplyOfferSuccess para actualizar las ofertas
          //a las que se ha inscrito el usuario
          new OfferActions.CancelApplyOfferSuccess(user.offers),
          //.. actualizaremos el usuario actual
          new UserActions.SetCurrentUser(user),
        ]),
        catchError((error) => of(new OfferActions.CancelApplyOfferError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  cancelApplyOfferSuccess$ = this.actions$.pipe(
    ofType(OfferActions.OfferActionTypes.CANCEL_APPLY_OFFER_SUCCESS),
    tap(() => this.router.navigate(["/admin/dashboard"]))
  );
}
