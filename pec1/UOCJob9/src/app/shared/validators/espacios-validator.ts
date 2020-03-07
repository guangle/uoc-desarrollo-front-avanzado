import { AbstractControl } from "@angular/forms";

export function EspaciosValidator(control: AbstractControl) {
  //Comprueba que el valor no empieza o termina en espacio
  if (control.value === null || control.value === "") {
    return null;
  }
  if (control.value.endsWith(" ") || control.value.startsWith(" ")) {
    return { espacio: true };
  }
  return null;
}
