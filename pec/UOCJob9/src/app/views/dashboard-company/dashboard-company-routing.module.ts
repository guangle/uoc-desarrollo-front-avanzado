import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardCompanyComponent } from "./dashboard-company.component";

const routes: Routes = [
  /*
  {
    path: "",
    component: DashboardCompanyComponent
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardCompanyRoutingModule {}
