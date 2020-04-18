/** /state/demo es una prueba de concepto únicamente destinada a asentar los conocimientos
 * de ngrx, trastear y echar a andar un ejemplo sencillo
 */

//En este fichero simplemente describimos la interfaz de nuestro store, es de alguna forma como la definicón DLL si pensaramos
//en términos de BBDD, o bueno, simplemente es la especificación de la forma que tiene nuestro almacen (siempre la parte relativa a
//esta funcionalidad 'Demo' de la aplicación). Cada módulo tendrá su interfaz para el Store

//Algo así como que cada módulo tiene su tabla donde guardar (salvando las distancias claro)

//En mi ejemplo, mi store de la parte 'Demo' de la aplicación va a tener 3 atributos, uno con un array de números, otro
//con un array de fechas y otro con los usuarios de la aplicacion.

//Todo esto está en la memoria RAM del cliente

import { User } from "../../models/user.model";

export interface DemoState {
  numeros: number[];
  fechas: Date[];
  usuarios: User[];
}
