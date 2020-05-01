import { NgModule } from "@angular/core";

import { FigurecardComponent } from "./figurecard/figurecard.component";
import { ImagecardComponent } from "./imagecard/imagecard.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { MsgIconBtnComponent } from "./msgiconbtn/msgiconbtn.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SettingsComponent } from "./settings/settings.component";

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../shared/material.module";
import { RootComponent } from "./root/root.component";
import { TemplateRoutingModule } from "./template-routing.module";
/**
 * Agrupamos en un módulo los diferentes componentes que provee
 * el template en el que nos hemos basado
 * https://github.com/wangdicoder/angular-material-dashboard
 */

@NgModule({
  declarations: [
    ImagecardComponent,
    FigurecardComponent,
    NavbarComponent,
    HeaderComponent,
    MsgIconBtnComponent,
    RootComponent,
    SidebarComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    //Estos componentes, a su vez, requieren angular-material para funcionar
    MaterialModule,
    TemplateRoutingModule,
  ],
  exports: [
    ImagecardComponent,
    FigurecardComponent,
    NavbarComponent,
    HeaderComponent,
    MsgIconBtnComponent,
    RootComponent,
    SidebarComponent,
    SettingsComponent,
  ],
})
export class TemplateModule {}
