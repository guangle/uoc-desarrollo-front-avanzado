import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, TemplateModule, MaterialModule],
})
export class ProfileModule {}
