import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
//import * as PokemonActions from '@states/pokemon/pokemon.actions';
//import * as PokemonSelectors from '@states/pokemon/pokemon.selector';
import * as UsersActions from "../../shared/state/user/actions/user.actions";
import * as UsersSelectors from "../../shared/state/user/selectors/user.selector";

import * as DemoSelectors from "../../shared/state/demo/selectors/demo.selector";
import * as DemoActions from "../../shared/state/demo/actions/demo.actions";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"]
})
export class NotesComponent implements OnInit {
  //En notas voy a hacer las primeras pruebas del acceso al store

  //Conectamos el component con el trozo del store que nos interesa (usuarios)
  //haciendo uso de uno de los selectores implementado
  public users$: Observable<any> = this.store$.select(UsersSelectors.selectAll);

  //Los selectores son observables de la parte de una parte concreta del store
  public numeros$: Observable<any> = this.store$.select(
    DemoSelectors.selectNumeros
  );
  public fechas$: Observable<any> = this.store$.select(
    DemoSelectors.selectFechas
  );
  public usuarios$: Observable<any> = this.store$.select(
    DemoSelectors.selectUsuarios
  );

  //Le inyectamos al constructor el store de la aplicación
  constructor(private store$: Store<AppStore>) {
    //En el constructor del componente, cargamos los usuarios
    //Esto hará que se vaya ejecutando (lo que se tenga que ejecutar, nos es transparente),
    //para cargar los usuarios. Cuando se actualice el state ya se actualizará el observable
    //que tenemos para los usuarios

    //this.store$.dispatch(new UsersActions.LoadUsers());

    //Venga, cuando cargo el componente invoco manualmente a mis dos acciones de Demo
    this.store$.dispatch(new DemoActions.Accion1());
    this.store$.dispatch(new DemoActions.Accion2());

    this.store$.dispatch(new DemoActions.Accion3());

    this.numeros$.subscribe(x => {
      console.log("hemos recibido algo en el sector de numeros");
      console.log(x);
    });

    /*
    this.users$.subscribe(x => {
      console.log("se ha notificado un cambio en el observable del estado!");
      console.log(x);
    });
    */
  }

  ngOnInit(): void {}
}
