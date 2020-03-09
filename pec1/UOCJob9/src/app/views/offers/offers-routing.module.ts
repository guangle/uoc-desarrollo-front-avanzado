import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './offers.component';
import { OfferDetailComponent } from '../offer-detail/offer-detail.component';

const routes: Routes = [
  {
    path: "list",
    component: OffersComponent
  }, {
    path: "detail",
    component: OfferDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
