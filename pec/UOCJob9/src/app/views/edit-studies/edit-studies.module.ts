import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EditStudiesRoutingModule } from "./edit-studies-routing.module";

import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EditStudiesComponent } from "./edit-studies.component";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [EditStudiesComponent],
  imports: [
    CommonModule,
    EditStudiesRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    TemplateModule,
    MaterialModule,
  ],
})
export class EditStudiesModule {}
