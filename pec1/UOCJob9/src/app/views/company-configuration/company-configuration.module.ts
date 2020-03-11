import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyConfigurationRoutingModule } from './company-configuration-routing.module';
import { CompanyConfigurationComponent } from './company-configuration.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [CompanyConfigurationComponent],
  imports: [
    CommonModule,
    CompanyConfigurationRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CompanyConfigurationComponentModule { }
