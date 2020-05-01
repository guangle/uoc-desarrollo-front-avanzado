import { AfterViewInit, Component, OnInit, OnDestroy } from "@angular/core";
//Servicio de negocio para las opciones.. REFACT
import { SettingsService } from "../../../shared/services/settings.service";
import { ROUTES } from "./sidebar-routes.config";
import { ROUTES_COMPANY } from "./sidebar-routes.config";

import { Store } from "@ngrx/store";
import { AppStore } from "../../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as AuthSelectors from "../../../shared/state/auth/selectors/auth.selector";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  public color: string;
  public menuItems: object;
  public activeFontColor: string;
  public normalFontColor: string;
  public dividerBgColor: string;

  //El sidebar cambiara en función del usuario logado
  public authInfo$: Observable<any> = this.store$.select(
    AuthSelectors.selectAuthState
  );

  constructor(
    private store$: Store<AppStore>,
    public settingsService: SettingsService
  ) {
    //menu dinamico en funcion del tipo de usuario logado
    this.authInfo$.subscribe((login_state) => {
      if (login_state.logged) {
        if ("user" === login_state.type) {
          this.menuItems = ROUTES;
        } else if ("company" === login_state.type) {
          this.menuItems = ROUTES_COMPANY;
        }
      }
    });

    this.activeFontColor = "rgba(0,0,0,.6)";
    this.normalFontColor = "rgba(255,255,255,.8)";
    this.dividerBgColor = "rgba(255, 255, 255, 0.5)";
  }

  ngOnInit() {
    this.color = this.settingsService.getSidebarFilter();
    this.settingsService.sidebarFilterUpdate.subscribe((filter: string) => {
      this.color = filter;
      if (filter === "#fff") {
        this.activeFontColor = "rgba(0,0,0,.6)";
      } else {
        this.activeFontColor = "rgba(255,255,255,.8)";
      }
    });
    this.settingsService.sidebarColorUpdate.subscribe((color: string) => {
      if (color === "#fff") {
        this.normalFontColor = "rgba(0,0,0,.6)";
        this.dividerBgColor = "rgba(0,0,0,.1)";
      } else {
        this.normalFontColor = "rgba(255,255,255,.8)";
        this.dividerBgColor = "rgba(255, 255, 255, 0.5)";
      }
    });
  }
  ngOnDestroy() {
    this.settingsService.sidebarFilterUpdate.unsubscribe();
    this.settingsService.sidebarColorUpdate.unsubscribe();
  }

  ngAfterViewInit() {}
}
