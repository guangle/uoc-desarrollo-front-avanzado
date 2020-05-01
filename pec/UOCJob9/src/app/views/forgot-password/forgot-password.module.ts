import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    //importamos el servicio que nos permitira trabajar con formularios reactivos
    ReactiveFormsModule,
    RouterModule,
    TemplateModule,
    MaterialModule,
  ],
})
export class ForgotPasswordModule {}
