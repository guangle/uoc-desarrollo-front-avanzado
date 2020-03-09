import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./shared/core.module";
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app-routing";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    //importamos el servicio que nos permitira trabajar con formularios reactivos
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
