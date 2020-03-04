import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditLanguagesComponent } from './edit-languages.component';


const routes: Routes = [
  {
    path: "",
    component: EditLanguagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditLanguagesRoutingModule { }
