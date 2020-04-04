/** /state/demo es una prueba de concepto únicamente destinada a asentar los conocimientos
 * de ngrx, trastear y echar a andar un ejemplo sencillo
 */

import { DemoState } from "../store.demo";
import { DemoActionTypes, DemoActions } from "../actions/demo.actions";

//En todos los reducers se debe especificar un estado inicial
export function demoInitialState(): DemoState {
  return {
    numeros: [],
    fechas: [],
    usuarios: []
  };
}

//Reucer = (estado, accion) => nuevo estado.
//Se ejectua cada vez que se ejecute una accion

export function demoReducer(
  state: DemoState = demoInitialState(),
  action: DemoActions
): DemoState {
  switch (action.type) {
    case DemoActionTypes.ACCION1_OK:
      //Solo actualizo el atributo numeros, el resto tal y como estaba
      return {
        ...state,
        numeros: action.payload
      };
    case DemoActionTypes.ACCION2_OK:
      return {
        ...state,
        fechas: action.payload
      };
    case DemoActionTypes.ACCION3_OK:
      return {
        ...state,
        usuarios: action.payload
      };
    //Si no es ninguno de las acciones que yo contemplo, devuelvo el estado
    //tal y como estaba
    default:
      return state;
  }
}
