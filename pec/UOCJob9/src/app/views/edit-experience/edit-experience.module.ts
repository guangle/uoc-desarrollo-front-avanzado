import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EditExperienceRoutingModule } from "./edit-experience-routing.module";
import { EditExperienceComponent } from "./edit-experience.component";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [EditExperienceComponent],
  imports: [
    CommonModule,
    EditExperienceRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    TemplateModule,
    MaterialModule,
  ],
})
export class EditExperienceModule {}
