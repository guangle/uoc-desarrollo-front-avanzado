import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./shared/core.module";
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app-routing";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { MyServicioService } from "./my-servicio.service";
import { ReactiveFormsModule } from "@angular/forms";
import { EditProfileComponent } from "./views/edit-profile/edit-profile.component";

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    //importamos el servicio que nos permitira trabajar con formularios reactivos
    ReactiveFormsModule,
    //InMemoryWebApiModule para simular un backend
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  declarations: [AppComponent],
  providers: [MyServicioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
