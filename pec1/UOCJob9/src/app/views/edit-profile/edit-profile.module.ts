import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EditProfileRoutingModule } from "./edit-profile-routing.module";
import { EditProfileComponent } from "./edit-profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [EditProfileComponent],
  imports: [CommonModule, EditProfileRoutingModule, ReactiveFormsModule]
})
export class EditProfileModule {}
