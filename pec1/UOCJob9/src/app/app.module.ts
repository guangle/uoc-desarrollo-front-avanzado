import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./shared/core.module";
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app-routing";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { ReactiveFormsModule } from "@angular/forms";
import { EditProfileComponent } from "./views/edit-profile/edit-profile.component";
import { EditStudiesComponent } from './views/edit-studies/edit-studies.component';
import { EditExperienceComponent } from './views/edit-experience/edit-experience.component';
import { EditLanguagesComponent } from './views/edit-languages/edit-languages.component';

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
  declarations: [AppComponent, EditStudiesComponent, EditExperienceComponent, EditLanguagesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
