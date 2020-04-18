import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { DataService } from "../../shared/services/data.service";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Offer } from "src/app/shared/models/offer.model";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as OfferSelectors from "../../shared/state/offer/selectors/offer.selector";
import * as OfferActions from "../../shared/state/offer/actions/offer.actions";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";

@Component({
  selector: "app-my-offers",
  templateUrl: "./my-offers.component.html",
  styleUrls: ["./my-offers.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOffersComponent implements OnInit {
  public user: User;
  public offers: Offer[];

  //El componente observará las ofertas de usuario, las listará y ofrecerá una acción
  //para acceder al detalle.

  public userOffers$: Observable<any> = this.store$.select(
    OfferSelectors.userOffersSelector
  );

  constructor(private store$: Store<AppStore>) {}

  ngOnInit(): void {}

  /** Accede a la página de detalle de la oferta que se pase como parámetro.
   * El reducer asociado a la acción se encargará de determinar si el usurio
   * esta inscrito o no para mostrar las diferentes opciones en la página de detalle
   */
  public offerDetail(offer: Offer) {
    this.store$.dispatch(new OfferActions.SetCurrentOffer(offer));
  }
}
