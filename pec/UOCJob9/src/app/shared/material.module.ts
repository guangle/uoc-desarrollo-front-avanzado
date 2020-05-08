import { MatDialogModule } from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";

/**
 * Como se proponía en el enunciado de la práctica, agrupamos los diferentes
 * elementos Material-Angular en ún único módulo para tener unificado las herramientas
 * de la interfaz y hacer más concisas las importaciones en el resto de módulos
 */

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
})
export class MaterialModule {}
