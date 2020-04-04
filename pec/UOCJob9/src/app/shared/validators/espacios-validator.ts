import { AbstractControl } from "@angular/forms";

/** Validador concreto para comprobar si un control empieza o termina con un espacio en blanco */
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
