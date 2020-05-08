import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NotesRoutingModule } from "./notes-routing.module";
import { NotesComponent } from "./notes.component";
import { MaterialModule } from "../../shared/material.module";

@NgModule({
  declarations: [NotesComponent],
  imports: [CommonModule, NotesRoutingModule, MaterialModule],
})
export class NotesModule {}
