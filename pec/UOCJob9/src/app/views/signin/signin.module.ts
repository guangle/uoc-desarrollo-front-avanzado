import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SigninRoutingModule } from "./signin-routing.module";
import { SigninComponent } from "./signin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    //importamos el servicio que nos permitira trabajar con formularios reactivos
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SigninModule {}
