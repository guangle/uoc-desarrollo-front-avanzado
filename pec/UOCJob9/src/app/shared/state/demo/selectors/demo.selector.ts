/** /state/demo es una prueba de concepto únicamente destinada a asentar los conocimientos
 * de ngrx, trastear y echar a andar un ejemplo sencillo
 */

import { createFeatureSelector, createSelector } from "@ngrx/store";

import { DemoState } from "../store.demo";

/*
 Los selectores son como consultas a una parte concreta del store. Nos sirven como 'enganche'
 entre observables que existirán en nuetros componentes y conjuntos concretos de datos. De esta forma,
 cuando esos datos cambien los componentes se actualizrán (porque los están observando)

 //Selector = un 'foco' a una parte concreta de nuestro estado. Un acceso directo para que los componentes
 vean y estén al día de un determinado subconjunto de datos de nuestra aplicación
*/

export const selectDemoState = createFeatureSelector<DemoState>("demo");

export const selectNumeros = createSelector(selectDemoState, state => {
  console.log("slect all");
  return state.numeros;
});

export const selectFechas = createSelector(selectDemoState, state => {
  return state.fechas;
});

export const selectUsuarios = createSelector(selectDemoState, state => {
  return state.usuarios;
});
