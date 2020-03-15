import { AbstractControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";

//Cross field validator, leido en
//https://medium.com/@realTomaszKula/angular-cross-field-validation-d94e0d063b61

/*
En base al tipo de identificación 'documentType', aplicamos una validación u otra
al número del documento de identificación: 'documentNumber'

*/

export function NumeroIdentificacionValidator(fg: FormGroup) {
  const documentType = fg.get("documentType").value;
  const documentNumber = fg.get("documentNumber").value;
  if (documentType == 1) {
    //nif
    if (!validateNifNie(documentNumber)) {
      return { numeroIdentificacion: true };
    }
  }
  if (documentType == 2) {
    //otro : al menos que hay aalgo en el campo
    if (!documentNumber) {
      return { numeroIdentificacion: true };
    }
    return null;
  }
  if (documentType == 3) {
    //pasaporte: expresion regular
    if (!new RegExp("[A-Z]{1}[0-9]{7}").test(documentNumber)) {
      return { numeroIdentificacion: true };
    }
  }
  return null;
}

//blog.singuerinc.com/javascript/validation/spain/dni/nie/nif/regex/2014/08/06/code-day-006-spain-dni-validation/
function validateNifNie(value) {
  var validChars = "TRWAGMYFPDXBNJZSQVHLCKET";
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str
    .replace(/^[X]/, "0")
    .replace(/^[Y]/, "1")
    .replace(/^[Z]/, "2");

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}
