import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";
import * as OfferSelectors from "../../shared/state/offer/selectors/offer.selector";
import * as CompanySelectors from "../../shared/state/company/selectors/company.selector";
import * as OfferActions from "../../shared/state/offer/actions/offer.actions";
import * as CompanyActions from "../../shared/state/company/actions/company.actions";
import * as AuthActions from "../../shared/state/auth/actions/auth.actions";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  //Definimos los selectores apropiados para poder mostrar infrmación
  //rsumen en el dashboard

  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  public offers$: Observable<any> = this.store$.select(
    OfferSelectors.offersSelector
  );

  public userOffers$: Observable<any> = this.store$.select(
    OfferSelectors.userOffersSelector
  );

  public empresas$: Observable<any> = this.store$.select(
    CompanySelectors.empresasSelector
  );

  constructor(private store$: Store<AppStore>, private router: Router) {
    //Cargamos las offertas y las ofertas del usuario para
    //mostrar en los cuadros de información resumen de la parte superior

    this.currentUser$.subscribe((u) => {
      this.store$.dispatch(new OfferActions.LoadOffers(u));
      this.store$.dispatch(new OfferActions.LoadUserOffers(u));
      this.store$.dispatch(new CompanyActions.LoadCompanies());
    });
  }

  ngOnInit() {}

  profile() {
    this.router.navigate(["/uojobs/users/profile"]);
  }

  offers() {
    this.router.navigate(["/uojobs/users/offers"]);
  }

  myoffers() {
    this.router.navigate(["/uojobs/users/my-offers"]);
  }

  //Pasamos la logica del logout al navbar
  /*
  logout() {
    this.store$.dispatch(new AuthActions.Logout());
  }
  */
}
