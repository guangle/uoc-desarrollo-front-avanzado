import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RootComponent } from "./root/root.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { MyOffersComponent } from "../my-offers/my-offers.component";
import { ProfileComponent } from "../profile/profile.component";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { OffersComponent } from "../offers/offers.component";
import { SettingsComponent } from "./settings/settings.component";
import { EditStudiesComponent } from "../edit-studies/edit-studies.component";
import { EditLanguagesComponent } from "../edit-languages/edit-languages.component";
import { EditExperienceComponent } from "../edit-experience/edit-experience.component";
import { OfferDetailComponent } from "../offer-detail/offer-detail.component";
import { DashboardCompanyComponent } from "../dashboard-company/dashboard-company.component";

const routes: Routes = [
  {
    path: "users",
    component: RootComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: ProfileComponent },
      {
        path: "offers",
        component: OffersComponent,
      },
      { path: "offer-detail", component: OfferDetailComponent },
      { path: "my-offers", component: MyOffersComponent },
      { path: "personalize", component: SettingsComponent },
      { path: "edit-profile", component: EditProfileComponent },
      { path: "edit-studies", component: EditStudiesComponent },
      { path: "edit-experience", component: EditExperienceComponent },
      { path: "edit-languages", component: EditLanguagesComponent },
    ],
  },
  {
    path: "companies",
    component: RootComponent,
    children: [
      { path: "dashboard-company", component: DashboardCompanyComponent },
      { path: "edit-profile", component: DashboardCompanyComponent },
      { path: "configuration", component: DashboardCompanyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
