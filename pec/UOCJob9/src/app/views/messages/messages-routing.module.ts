import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MessagesComponent } from "./messages.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
