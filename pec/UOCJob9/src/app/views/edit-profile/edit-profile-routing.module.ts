import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditProfileComponent } from "./edit-profile.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileRoutingModule {}
