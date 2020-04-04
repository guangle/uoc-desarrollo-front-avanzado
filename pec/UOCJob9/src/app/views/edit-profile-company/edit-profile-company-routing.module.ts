import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditProfileCompanyComponent } from "./edit-profile-company.component";

const routes: Routes = [
  {
    path: "",
    component: EditProfileCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProfileCompanyRoutingModule {}
