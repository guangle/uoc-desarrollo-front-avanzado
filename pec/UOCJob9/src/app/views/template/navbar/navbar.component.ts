import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";

import { Store } from "@ngrx/store";
import { AppStore } from "../../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as UserSelectors from "../../../shared/state/user/selectors/user.selector";
import * as AuthActions from "../../../shared/state/auth/actions/auth.actions";
import { Router } from "@angular/router";
import * as CompanySelectors from "../../../shared/state/company/selectors/company.selector";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//Es necesario adaptar alguno de los components del template,
//En este caso, para observar el usuario en sesion
//y mostrar la opción de logout
export class NavbarComponent implements OnInit {
  @Input() title: string;

  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  public currentCompany$: Observable<any> = this.store$.select(
    CompanySelectors.currentCompanySelector
  );

  constructor(private store$: Store<AppStore>, private router: Router) {}

  ngOnInit() {}

  menuClick() {
    // document.getElementById('main-panel').style.marginRight = '260px';
    this.router.navigate(["/uojobs/users/offers"]);
  }

  logout() {
    this.store$.dispatch(new AuthActions.Logout());
  }

  profile() {
    this.router.navigate(["/uojobs/users/profile"]);
  }

  profileCompany() {
    this.router.navigate(["/uojobs/companies/edit-profile"]);
  }

  //Acceso directo al dashboard que tendremos siempre presente en la barra
  //de navegacion
  dashboard() {
    this.router.navigate(["/uojobs/users/dashboard"]);
  }

  dashboardCompany() {
    this.router.navigate(["/uojobs/companies/dashboard"]);
  }
}
