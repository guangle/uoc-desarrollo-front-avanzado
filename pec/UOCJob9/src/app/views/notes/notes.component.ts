import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";

import * as DemoSelectors from "../../shared/state/demo/selectors/demo.selector";
import * as DemoActions from "../../shared/state/demo/actions/demo.actions";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  //En notas voy a hacer las primeras pruebas del acceso al store

  //Con los selectores definidos en la demo, puedo observar las partes concretas de ese store para
  //estar atento a sus cambios
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

    //Acciones de prueba
    this.store$.dispatch(new DemoActions.Accion1());
    this.store$.dispatch(new DemoActions.Accion2());

    this.store$.dispatch(new DemoActions.Accion3());

    this.numeros$.subscribe((x) => {
      console.log("hemos recibido algo en el sector de numeros");
      console.log(x);
    });
  }

  ngOnInit(): void {}
}
