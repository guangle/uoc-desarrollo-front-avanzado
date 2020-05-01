import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditLanguagesComponent } from "./edit-languages.component";
import { EditLanguagesRoutingModule } from "./edit-languages-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [EditLanguagesComponent],
  imports: [
    CommonModule,
    EditLanguagesRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    TemplateModule,
    MaterialModule,
  ],
})
export class EditLanguagesModule {}
