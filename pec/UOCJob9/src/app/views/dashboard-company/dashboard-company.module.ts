import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DashboardCompanyComponent } from "./dashboard-company.component";
import { DashboardCompanyRoutingModule } from "./dashboard-company-routing.module";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [DashboardCompanyComponent],
  imports: [
    CommonModule,
    DashboardCompanyRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    TemplateModule,
    MaterialModule,
  ],
})
export class DashboardCompanyModule {}
