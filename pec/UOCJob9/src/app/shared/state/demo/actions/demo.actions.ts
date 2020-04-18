/** /state/demo es una prueba de concepto únicamente destinada a asentar los conocimientos
 * de ngrx, trastear y echar a andar un ejemplo sencillo
 */
import { Action } from "@ngrx/store";
import { User } from "../../../models/user.model";
//Actions -> Algo así como 'Qué funcionalidades ofrece esta parte de la aplicación'

//Son simplemente constantes para enumerar las acciones. Una expecie de interfaz, ya que leyendo
//estas constantes nos podemos hacer una idea de que funcionalidad ofrece este submodulo
export enum DemoActionTypes {
  ACCION1 = "[DEMO] Accion1",
  ACCION1_OK = "[DEMO] Accion1 OK",
  ACCION2 = "[DEMO] Accion2",
  ACCION2_OK = "[DEMO] Accion2 OK",
  //pruebas con usuarios
  ACCION3 = "[DEMO] Accion3",
  ACCION3_OK = "[DEMO] Accion3 OK",
}

//Hay que implementar una clase (que extienda a Action) por cada acción definida
//y todas ellas tienen que tener un atributo type

export class Accion1 implements Action {
  readonly type = DemoActionTypes.ACCION1;
  constructor() {}
}

export class Accion2 implements Action {
  readonly type = DemoActionTypes.ACCION2;
  constructor() {}
}

export class Accion1OK implements Action {
  readonly type = DemoActionTypes.ACCION1_OK;
  constructor(public payload: Array<number>) {}
}

export class Accion2OK implements Action {
  readonly type = DemoActionTypes.ACCION2_OK;
  constructor(public payload: Array<Date>) {}
}

export class Accion3 implements Action {
  readonly type = DemoActionTypes.ACCION3;
  constructor() {}
}

export class Accion3OK implements Action {
  readonly type = DemoActionTypes.ACCION3_OK;
  constructor(public payload: Array<User>) {}
}

//Opcional. El constructor de la acción puede tener un 'payload'. (o varios) Un payload parece ser un objeto que voy a tener
//si la acción necesita para ejecutarse(la recibe en el constructor). Por ejemplo, un Action de Load users va a tener un payload de tipo
//array de usuarios.

//El payload lo setea el encargado de invocar a la accion, puede ser un componente o un efecto

//Exportamos todas nuestras clases
export type DemoActions =
  | Accion1
  | Accion2
  | Accion1OK
  | Accion2OK
  | Accion3
  | Accion3OK;
