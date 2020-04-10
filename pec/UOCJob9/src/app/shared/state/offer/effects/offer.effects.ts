import * as OfferActions from "../actions/offer.actions";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap, filter } from "rxjs/operators";

import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { DataService } from "../../../services/data.service";

@Injectable()
export class OfferEffects {
  constructor(
    private actions$: Actions,
    private dataservice: DataService,
    private router: Router
  ) {}

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
}
