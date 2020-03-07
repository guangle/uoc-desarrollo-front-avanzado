import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EditExperienceRoutingModule } from "./edit-experience-routing.module";
import { EditExperienceComponent } from "./edit-experience.component";

@NgModule({
  declarations: [EditExperienceComponent],
  imports: [
    CommonModule,
    EditExperienceRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class EditExperienceModule {}
