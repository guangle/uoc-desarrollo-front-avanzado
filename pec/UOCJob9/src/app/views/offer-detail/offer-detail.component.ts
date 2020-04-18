import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { User } from "../../shared/models/user.model";
import { Offer } from "src/app/shared/models/offer.model";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";

import * as OfferSelectors from "../../shared/state/offer/selectors/offer.selector";
import * as OfferActions from "../../shared/state/offer/actions/offer.actions";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";

import { Observable } from "rxjs";

@Component({
  selector: "app-offer-detail",
  templateUrl: "./offer-detail.component.html",
  styleUrls: ["./offer-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferDetailComponent implements OnInit {
  //Partes del Store que nos interesa 'Observar' para mostrar el detalle de la oferta:
  //usuario actual, oferta para visualizar y si está inscrito o no

  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  public currentOffer$: Observable<any> = this.store$.select(
    OfferSelectors.currentOfferSelector
  );

  public inscrito$: Observable<any> = this.store$.select(
    OfferSelectors.inscritoSelector
  );

  constructor(private store$: Store<AppStore>) {}

  ngOnInit(): void {}

  /** Inscribe al usuario a la oferta que se está visualizando */
  inscribirOferta(user: User, offer: Offer) {
    console.log("Se va a inscribir al usuario en la oferta: ", offer);
    this.store$.dispatch(new OfferActions.ApplyOffer(user, offer));
  }

  /*Des-inscribe al usuario de la oferta que se está visualizando */
  borrarseOferta(user: User, offer: Offer) {
    console.log("Se va a borrar al usuario de la oferta: ", offer);
    this.store$.dispatch(new OfferActions.CancelApplyOffer(user, offer));
  }
}
