import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EditProfileCompanyRoutingModule } from "./edit-profile-company-routing.module";
import { EditProfileCompanyComponent } from "./edit-profile-company.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [EditProfileCompanyComponent],
  imports: [CommonModule, EditProfileCompanyRoutingModule, ReactiveFormsModule]
})
export class EditProfileCompanyModule {}
