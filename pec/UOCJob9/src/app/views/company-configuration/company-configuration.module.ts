import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CompanyConfigurationRoutingModule } from "./company-configuration-routing.module";
import { CompanyConfigurationComponent } from "./company-configuration.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [CompanyConfigurationComponent],
  imports: [
    CommonModule,
    CompanyConfigurationRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    TemplateModule,
    MaterialModule,
  ],
})
export class CompanyConfigurationComponentModule {}
