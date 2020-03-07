import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditLanguagesComponent } from "./edit-languages.component";
import { EditLanguagesRoutingModule } from "./edit-languages-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [EditLanguagesComponent],
  imports: [
    CommonModule,
    EditLanguagesRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class EditLanguagesModule {}
