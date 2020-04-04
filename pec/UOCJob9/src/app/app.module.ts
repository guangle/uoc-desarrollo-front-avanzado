import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./shared/core.module";
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app-routing";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { StoreRouterConnectingModule, routerReducer } from "@ngrx/router-store";
import { UserEffects } from "../app/shared/state/user/effects/user.effects";
import { DemoEffects } from "../app/shared/state/demo/effects/demo.effects";
import { AuthEffects } from "../app/shared/state/auth/effects/auth.effects";

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    //importamos el servicio que nos permitira trabajar con formularios reactivos
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AuthEffects, UserEffects, DemoEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    //mete las rutas en el store para poder debuguear por las rutas ejecutadas
    StoreRouterConnectingModule.forRoot({ stateKey: "router" })
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
