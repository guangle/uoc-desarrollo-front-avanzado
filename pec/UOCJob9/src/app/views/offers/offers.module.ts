import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OffersRoutingModule } from "./offers-routing.module";
import { OffersComponent } from "./offers.component";
import { OfferDetailComponent } from "../offer-detail/offer-detail.component";
import { MyOffersComponent } from "../my-offers/my-offers.component";
import { TemplateModule } from "../template/template.module";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [OffersComponent, OfferDetailComponent, MyOffersComponent],
  imports: [CommonModule, OffersRoutingModule, TemplateModule, MaterialModule],
})
export class OffersModule {}
