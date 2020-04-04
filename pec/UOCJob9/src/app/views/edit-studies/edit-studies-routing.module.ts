import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditStudiesModule } from './edit-studies.module';
import { EditStudiesComponent } from './edit-studies.component';


const routes: Routes = [
  {
    path: "",
    component: EditStudiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditStudiesRoutingModule { }
