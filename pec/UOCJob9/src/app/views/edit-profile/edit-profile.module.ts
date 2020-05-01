import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EditProfileRoutingModule } from "./edit-profile-routing.module";
import { EditProfileComponent } from "./edit-profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    //importamos el servicio que nos permitira trabajar con formularios reactivos
    ReactiveFormsModule,
    TemplateModule,
    MaterialModule,
  ],
})
export class EditProfileModule {}
