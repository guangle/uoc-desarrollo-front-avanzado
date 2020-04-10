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
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/* Componente encargado de mostrar todas las ofertas que sirven para el usuario */
export class OffersComponent implements OnInit {
  public user: User;
  public offers: Offer[];

  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  public offers$: Observable<any> = this.store$.select(
    OfferSelectors.offersSelector
  );

  constructor(
    private router: Router,
    private dataservice: DataService,
    //TODO: pendiene, hay que quitar el servicio de aqui
    private store$: Store<AppStore>,
    private userService: UserService
  ) {
    this.currentUser$.subscribe((u) => {
      this.user = u;
    });
    /*
    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    console.log("obteniendo ofertas..");
    this.dataservice.getOffers().subscribe(data => {
      console.log("Obertas obtenidas..");
      //"Sólo se mostrarán las ofertas en las que el candidato cumpla con su formación"
      this.offers = data.filter(o =>
        o.title
          .map(t => t.name)
          .some(nombre =>
            this.user.studies.map(s => s.title.name).includes(nombre)
          )
      );
    });
    */
  }

  public offerDetail(offer: Offer) {
    this.store$.dispatch(new OfferActions.SetCurrentOffer( offer ));
  }

  ngOnInit() {
    //Cargamos la lista de ofertas adaptadas al usuariuo
    this.store$.dispatch(new OfferActions.LoadOffers(this.user));
  }
}
