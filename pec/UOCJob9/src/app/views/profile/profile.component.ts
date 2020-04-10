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
import { Language } from "src/app/shared/models/language.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//Nota PEC2. Este componente se ha simplificado enormemente, solo se encarga de 'despachar' acciones
//y estar 'pendiente' de los cambios del usuario
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

  /** Accede al form de edición y precarga la formación que se le pasa como parámetro */
  public editStudy(st: Study) {
    //Análogo a newStudy, pero estableciendo una formación para precargar
    //En este caso, el store tendra editMode=true
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

  public newLanguage() {
    this.store$.dispatch(new UserActions.SetCurrentLanguage());
  }

  public editLanguage(lang: Language) {
    this.store$.dispatch(new UserActions.SetCurrentLanguage(lang));
  }

  deleteLanguaje(lang: Language) {
    console.log("Se va a borrar el lenguaje del usuario con id: " + lang.uid);
    this.store$.dispatch(new UserActions.DeleteLanguage(this.user, lang));
  }
}
