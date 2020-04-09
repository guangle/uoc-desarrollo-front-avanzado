import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Language, LanguageName } from "../../shared/models/language.model";
import { Experience } from "../../shared/models/experience.model";
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { EspaciosValidator } from "../../shared/validators/espacios-validator";
import * as moment from "moment";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";
import * as UserActions from "../../shared/state/user/actions/user.actions";

@Component({
  selector: "app-edit-experience",
  templateUrl: "./edit-experience.component.html",
  styleUrls: ["./edit-experience.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditExperienceComponent implements OnInit {
  public user: User;
  public experience: Experience;
  public editExperienceForm: FormGroup;
  isSubmitted: boolean = false;
  id_exp;
  edit_mode: boolean = false;

  public currentExperience$: Observable<any> = this.store$.select(
    UserSelectors.currentExperienceSelector
  );

  //La propiedad readOnly del store nos indica si estamos ante una edición
  //o un alta
  public editMode$: Observable<any> = this.store$.select(
    UserSelectors.editModeSelector
  );

  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  constructor(
    private userService: UserService,
    //TODO: pendiene, hay que quitar el servicio de aqui
    private store$: Store<AppStore>,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.currentUser$.subscribe((u) => {
      this.user = u;
    });

    this.editMode$.subscribe((b) => {
      this.edit_mode = b;
    });

    //Llegados a este punto, tenemos en el store la experiencia con la que estamos trabajando
    //(o un objeto experiencia 'vacía' si se trata de una creación)
    this.currentExperience$.subscribe((e) => {
      console.log("currentExperience", e);
      this.experience = e;
      this.id_exp = this.experience ? this.experience.uid : null;
    });
  }

  ngOnInit(): void {
    //Una vez construido el componente,
    //creamos - inicializamos el formulairo reacivo
    this.createForm();
  }

  inEditMode() {
    return this.edit_mode;
  }

  createForm() {
    console.log("Creando el formulario de edición de experiencia");

    this.editExperienceForm = this.fb.group({
      empresa: [
        this.experience.empresa,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          EspaciosValidator,
        ],
      ],
      date_inicio: [
        this.experience.date_inicio
          ? formatDate(
              moment(this.experience.date_inicio, "DD/MM/YYYY").toDate(),
              "yyyy-MM-dd",
              "en"
            )
          : null,
        [Validators.required],
      ],
      date_fin: [
        this.experience.date_fin
          ? formatDate(
              moment(this.experience.date_fin, "DD/MM/YYYY").toDate(),
              "yyyy-MM-dd",
              "en"
            )
          : null,
        [Validators.required],
      ],
      puesto: [
        this.experience.puesto,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          EspaciosValidator,
        ],
      ],
      tareas: [
        this.experience.tareas,
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  submitExperience() {
    console.log("Submit del formulario de experiencia..*****");
    this.isSubmitted = true;
    if (this.editExperienceForm.valid) {
      //COMENTAR, LO HAGO ASI PORQUE EL SPREAD OPERATOR NO ES DEEP
      let experienceToSubmit = JSON.parse(JSON.stringify(this.experience));

      experienceToSubmit.empresa = this.editExperienceForm.get("empresa").value;
      experienceToSubmit.date_inicio = moment(
        this.editExperienceForm.get("date_inicio").value,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");
      experienceToSubmit.date_fin = moment(
        this.editExperienceForm.get("date_fin").value,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");
      experienceToSubmit.puesto = this.editExperienceForm.get("puesto").value;
      experienceToSubmit.tareas = this.editExperienceForm.get("tareas").value;
      if (this.inEditMode()) {
        experienceToSubmit.uid = this.id_exp;
      } else {
        experienceToSubmit.uid = this.user.experiencies.length + 1;
      }
      if (this.inEditMode()) {
        //Actualiamos la experiencia llamando a la acción para ello
        this.store$.dispatch(
          new UserActions.UpdateExperience(this.user, experienceToSubmit)
        );
      } else {
        //Creamos una nueva experiencia para el usuario llamando a la acción correspondiente
        this.store$.dispatch(
          new UserActions.CreateExperience(this.user, experienceToSubmit)
        );
      }
    } else {
      console.log(
        "No se guardan los datos de la experiencia en el backend porque el form no es valido"
      );
    }
  }

  /** Se invoca cuando se destruye el componente */
  ngOnDestroy() {}

  //Getters para acceder a los diferentes campos en la vista más comodamente
  get empresa() {
    return this.editExperienceForm.get("empresa");
  }
  get date_inicio() {
    return this.editExperienceForm.get("date_inicio");
  }
  get date_fin() {
    return this.editExperienceForm.get("date_fin");
  }
  get puesto() {
    return this.editExperienceForm.get("puesto");
  }
  get tareas() {
    return this.editExperienceForm.get("tareas");
  }
}
