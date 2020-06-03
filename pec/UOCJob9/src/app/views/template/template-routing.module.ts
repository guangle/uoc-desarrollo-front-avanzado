import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
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
import { EditProfileCompanyComponent } from "../edit-profile-company/edit-profile-company.component";
import { CompanyConfigurationComponent } from "../company-configuration/company-configuration.component";

const routes: Routes = [
  {
    path: "users",
    component: RootComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        loadChildren: () =>
          import("../../views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "profile",
        component: ProfileComponent,
        loadChildren: () =>
          import("../../views/profile/profile.module").then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: "offers",
        component: OffersComponent,
      },
      {
        path: "offer-detail",
        component: OfferDetailComponent,
        loadChildren: () =>
          import("../../views/offers/offers.module").then(
            (m) => m.OffersModule
          ),
      },
      { path: "my-offers", component: MyOffersComponent },
      { path: "personalize", component: SettingsComponent },
      {
        path: "edit-profile",
        component: EditProfileComponent,
        loadChildren: () =>
          import("../../views/edit-profile/edit-profile.module").then(
            (m) => m.EditProfileModule
          ),
      },
      {
        path: "edit-studies",
        component: EditStudiesComponent,
        loadChildren: () =>
          import("../../views/edit-studies/edit-studies.module").then(
            (m) => m.EditStudiesModule
          ),
      },
      {
        path: "edit-experience",
        component: EditExperienceComponent,
        loadChildren: () =>
          import("../../views/edit-experience/edit-experience.module").then(
            (m) => m.EditExperienceModule
          ),
      },
      {
        path: "edit-languages",
        component: EditLanguagesComponent,
        loadChildren: () =>
          import("../../views/edit-languages/edit-languages.module").then(
            (m) => m.EditLanguagesModule
          ),
      },
    ],
  },
  {
    path: "companies",
    component: RootComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardCompanyComponent,
        loadChildren: () =>
          import("../../views/dashboard-company/dashboard-company.module").then(
            (m) => m.DashboardCompanyModule
          ),
      },
      {
        path: "edit-profile",
        component: EditProfileCompanyComponent,
        loadChildren: () =>
          import(
            "../../views/edit-profile-company/edit-profile-company.module"
          ).then((m) => m.EditProfileCompanyModule),
      },
      {
        path: "configuration",
        component: CompanyConfigurationComponent,
        loadChildren: () =>
          import(
            "../../views/company-configuration/company-configuration.module"
          ).then((m) => m.CompanyConfigurationComponentModule),
      },
      { path: "personalize", component: SettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
