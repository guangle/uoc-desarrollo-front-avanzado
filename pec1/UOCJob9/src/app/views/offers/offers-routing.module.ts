import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OffersComponent } from "./offers.component";
import { OfferDetailComponent } from "../offer-detail/offer-detail.component";
import { MyOffersComponent } from "../my-offers/my-offers.component";

const routes: Routes = [
  {
    path: "list",
    component: OffersComponent
  },
  {
    path: "detail",
    component: OfferDetailComponent
  },
  {
    path: "my-offers",
    component: MyOffersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule {}
