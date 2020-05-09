import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EditProfileCompanyRoutingModule } from "./edit-profile-company-routing.module";
import { EditProfileCompanyComponent } from "./edit-profile-company.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [EditProfileCompanyComponent],
  imports: [
    CommonModule,
    EditProfileCompanyRoutingModule,
    ReactiveFormsModule,
    TemplateModule,
    MaterialModule,
  ],
})
export class EditProfileCompanyModule {}
