import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Study } from "../../shared/models/study.model";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";
import * as UserActions from "../../shared/state/user/actions/user.actions";
import { Experience } from "src/app/shared/models/experience.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public user: User;

  //Observamos el usuario actual del store, que es sobre el que vamos a trabajar
  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  constructor(
    private userService: UserService,
    //TODO: pendiene, hay que quitar el servicio de aqui
    private store$: Store<AppStore>,
    private router: Router
  ) {
    //Llegados a este punto, tenemos un usuario en el store
    this.currentUser$.subscribe((u) => {
      this.user = u;
    });
  }

  ngOnInit() {}

  public newStudy() {
    //llama a set current study sin parametros,
    //lo que provocara (por un efecto) que la aplicación se vaya a
    //la pantalla que contiene el formulario y además
    //se establecerá en el estado que NO estamos editando (editMode=false)
    this.store$.dispatch(new UserActions.SetCurrentStudy());
  }

  public editStudy(st: Study) {
    //console.log("editstudy");
    console.log(st);
    //TODO: comentar
    this.store$.dispatch(new UserActions.SetCurrentStudy(st));
  }

  /** Elimina el estudio del usuario cuyo id se pasa como parametro  */
  deleteStudies(st: Study) {
    console.log("Se va a borrar la formacion del usuario con id: " + st.uid);
    this.store$.dispatch(new UserActions.DeleteStudy(this.user, st));
  }

  public newExperience() {
    this.store$.dispatch(new UserActions.SetCurrentExperience());
  }

  public editExperience(ex: Experience) {
    this.store$.dispatch(new UserActions.SetCurrentExperience(ex));
  }

  deleteExperience(ex: Experience) {
    console.log("Se va a borrar la experiencia del usuario con id: " + ex.uid);
    this.store$.dispatch(new UserActions.DeleteExperience(this.user, ex));
  }

  /** Borra el lenguaje del usuario cuyo id se pasa como parametro */
  deleteLanguaje(id) {
    console.log("Se va a borrar el lenguaje del usuario con id: " + id);
    this.userService.deleteLanguaje(id).subscribe((data) => {
      console.log("Usuario actualizado tras borrar el lenguaje");
      this.user = data;
    });
  }
}
