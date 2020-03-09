import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { OfferDetailComponent } from '../offer-detail/offer-detail.component';



@NgModule({
  declarations: [OffersComponent, OfferDetailComponent],
  imports: [
    CommonModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
