import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";

// COMPONENTS

// DIRECTIVES

// PIPES

// SERVICES
import { AppConfirmService } from "./services/app-confirm/app-confirm.service";
import { AppComfirmComponent } from "./services/app-confirm/app-confirm.component";

const classesToInclude = [AppComfirmComponent];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule],

  providers: [AppConfirmService],
  entryComponents: [AppComfirmComponent],
  declarations: classesToInclude,
  exports: classesToInclude,
})
export class SharedModule {}
