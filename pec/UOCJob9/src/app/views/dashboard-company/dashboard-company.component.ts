import { Component, OnInit } from "@angular/core";
import { CompanyService } from "src/app/shared/services/company.service";
import { Router } from "@angular/router";
import { Company } from "../../shared/models/company.model";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";
import * as CompanySelectors from "../../shared/state/company/selectors/company.selector";
import * as AuthActions from "../../shared/state/auth/actions/auth.actions";

@Component({
  selector: "app-dashboard-company",
  templateUrl: "./dashboard-company.component.html",
  styleUrls: ["./dashboard-company.component.scss"],
})
export class DashboardCompanyComponent implements OnInit {
  //public company: Company;

  public currentCompany$: Observable<any> = this.store$.select(
    CompanySelectors.currentCompanySelector
  );

  constructor(private store$: Store<AppStore>, private router: Router) {
    /*
    console.log("Dashboard de empresa..");
    this.company = this.companyService.company;
    console.log(this.company);
    */
  }

  ngOnInit(): void {}

  perfil() {
    this.router.navigate(["/uojobs/companies/edit-profile"]);
  }

  configuracion() {
    this.router.navigate(["/uojobs/companies/configuration"]);
  }

  logout() {
    //this.companyService.clear();
    //this.router.navigate(["/signin"]);
    this.store$.dispatch(new AuthActions.Logout());
  }
}
