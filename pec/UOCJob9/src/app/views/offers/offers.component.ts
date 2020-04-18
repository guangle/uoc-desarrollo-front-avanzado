import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Offer } from "src/app/shared/models/offer.model";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as OfferSelectors from "../../shared/state/offer/selectors/offer.selector";
import * as OfferActions from "../../shared/state/offer/actions/offer.actions";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/* Componente encargado de mostrar todas las ofertas que sirven para el usuario */
export class OffersComponent implements OnInit {
  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  public offers$: Observable<any> = this.store$.select(
    OfferSelectors.offersSelector
  );

  constructor(private store$: Store<AppStore>) {
    //Una vez tengamos al usuario, cargamos las ofertas apropiadas para él
    //Esto actualizará el store de offers que estamos observando en offers$
    this.currentUser$.subscribe((u) => {
      this.store$.dispatch(new OfferActions.LoadOffers(u));
    });
  }

  public offerDetail(offer: Offer) {
    this.store$.dispatch(new OfferActions.SetCurrentOffer(offer));
  }

  ngOnInit() {}
}
