import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Language, LanguageName } from "../../shared/models/language.model";
import {
  Study,
  CollegeStudy,
  VocationalStudy,
} from "../../shared/models/study.model";
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
  selector: "app-edit-studies",
  templateUrl: "./edit-studies.component.html",
  styleUrls: ["./edit-studies.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStudiesComponent implements OnInit {
  public user: User;
  public study: Study;
  edit_mode: boolean = false;

  public editStudyForm: FormGroup;
  isSubmitted: boolean = false;
  id_study;

  tipos_titulos = [
    { uid: 2, name: "Título universitario" },
    { uid: 1, name: "Ciclo formativo" },
    { uid: 3, name: "Otro título." },
  ];

  centros_educativos = [
    { uid: 1, name: "IES Pablo Ruiz Picasso" },
    { uid: 2, name: "IES Politécnico Jesús Marin" },
    { uid: 3, name: "IES Poeta García Gutiérrez" },
  ];

  familias_profesionales = [
    { uid: 2, name: "Informática y comunicaciones" },
    { uid: 4, name: "Comercio y Marketing" },
    { uid: 5, name: "Administración y Gestión" },
  ];

  tipos_grado = [
    { uid: 1, name: "FP Básica" },
    { uid: 2, name: "Ciclo Formativo de Grado Medio" },
    { uid: 3, name: "Ciclo Formativo de Grado Superior" },
  ];

  ciclos = [];

  //Observamos la formacion actual del store, que es sobre el que vamos a trabajar
  public currentStudy$: Observable<any> = this.store$.select(
    UserSelectors.currentStudySelector
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
      //this.user = { ...u };
      this.user = JSON.parse(JSON.stringify(u));
      console.log("***");
      console.log(this.user);
    });

    this.editMode$.subscribe((b) => {
      this.edit_mode = b;
    });

    //Llegados a este punto, tenemos en el store la formacion con la que estamos trabajando
    this.currentStudy$.subscribe((s) => {
      console.log("currentStudy", s);
      //this.study = { ...s };
      this.study = JSON.parse(JSON.stringify(s));
      this.id_study = this.study ? this.study.uid : null;
      //Creamos - inicializamos el formulairo reacivo
      this.createForm();
      //Del enunciado se desprende que dependiendo del tipo de estudios (universitario, ciclo..)
      //se deberan validar unos campos u otros. Por tanto, debemos conseguir que nuestras restricciones
      //sean dinámicas. He visto un ejemplo en
      //https://www.codementor.io/@jimohhadi/angular-validators-with-conditional-validation-in-reactive-forms-pj5z7gsq5
      this.estableceValidacionesDinamicas();
    });

    //Diria que esto ya no hace falta, REFACT
    /*

    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    //obtenemos el parametro que indica el identificdor el elemento que estamos editando
    //(en cso de que se trate de una edicion)
    this.id_study = this.route.snapshot.queryParams["id"];
    if (this.inEditMode()) {
      this.study = this.user.studies.find((l) => l.uid == this.id_study);
      console.log("Es una edición de formación académica:");
      console.log(this.study);
    }

    */
  }

  ngOnInit(): void {}

  /** true si estamos editando un elemento o false si se trata de una creacion */
  inEditMode() {
    return this.edit_mode;
  }

  createForm() {
    console.log("Creando el formulario de edición de estudios");
    console.log("Edit mode? ", this.edit_mode);
    let level = this.edit_mode ? this.study.level.uid : 2;

    //Creamos el formulario sin validaciones porque estas se añadirán dinamicamente
    this.editStudyForm = this.fb.group({
      level: [level, [Validators.required]],
      universidad_centro: [null, []],
      universidad_titulo: [null, []],
      universidad_fecha: [null, []],
      universidad_bilingue: [null, []],
      universidad_certificado: [null, []],
      //campos para cuando es un ciclo
      ciclo_centro: [null, []],
      ciclo_familia: [null, []],
      ciclo_grado: [null, []],
      ciclo_ciclo: [null, []],
      ciclo_fecha: [null, []],
      ciclo_dual: [null, []],
      ciclo_bilingue: [null, []],
      ciclo_certificado: [null, []],
      //campo para cuando es un estudio de tipo otros
      otro_titulo: [null, []],
    });
    if (this.edit_mode) {
      if (level == 1) {
        let estudio_grado = this.study as VocationalStudy;
        this.editStudyForm
          .get("ciclo_centro")
          .setValue(estudio_grado.institution.uid);
        this.editStudyForm
          .get("ciclo_familia")
          .setValue(estudio_grado.category.uid);
        this.editStudyForm.get("ciclo_grado").setValue(estudio_grado.grade.uid);
        this.ciclos = [estudio_grado.title];
        this.editStudyForm.get("ciclo_ciclo").setValue(estudio_grado.title.uid);
        this.editStudyForm
          .get("ciclo_fecha")
          .setValue(
            formatDate(
              moment(estudio_grado.date, "DD/MM/YYYY").toDate(),
              "yyyy-MM-dd",
              "en"
            )
          );
        this.editStudyForm.get("ciclo_dual").setValue(estudio_grado.dual);
        this.editStudyForm
          .get("ciclo_bilingue")
          .setValue(estudio_grado.bilingue);
      } else if (level == 2) {
        let estudio_universitario = this.study as CollegeStudy;
        this.editStudyForm
          .get("universidad_centro")
          .setValue(estudio_universitario.institution.name);
        this.editStudyForm
          .get("universidad_titulo")
          .setValue(estudio_universitario.title.name);
        this.editStudyForm
          .get("universidad_fecha")
          .setValue(
            formatDate(
              moment(estudio_universitario.date, "DD/MM/YYYY").toDate(),
              "yyyy-MM-dd",
              "en"
            )
          );
        this.editStudyForm
          .get("universidad_bilingue")
          .setValue(estudio_universitario.bilingue);
      } else if (level == 3) {
        this.editStudyForm.get("otro_titulo").setValue(this.study.title.name);
      }
    }
    this.updateValidations(level);
  }

  estableceValidacionesDinamicas() {
    const levelControl = this.editStudyForm.get("level");
    this.editStudyForm.get("level").valueChanges.subscribe((level) => {
      console.log("cambia el level, actualizamos las validaciones");
      //limpiamos las validaciones de los diferentes componentes.
      this.updateValidations(level);
    });
  }

  /** Actualiza las validaciones del formulario en función del tipo de estudios seleccionado */
  updateValidations(level: number) {
    Object.keys(this.editStudyForm.controls).forEach((key) => {
      this.editStudyForm.controls[key].setValidators(null);
    });
    if (level == 2) {
      console.log("Universidad");
      this.editStudyForm
        .get("universidad_centro")
        .setValidators([Validators.required]);
      this.editStudyForm
        .get("universidad_titulo")
        .setValidators([Validators.required]);
      this.editStudyForm
        .get("universidad_fecha")
        .setValidators([Validators.required]);
    } else if (level == 1) {
      console.log("Cliclo");
      //Establecemos los campos que deben ser obligatorios
      this.editStudyForm
        .get("ciclo_centro")
        .setValidators([Validators.required]);
      this.editStudyForm
        .get("ciclo_familia")
        .setValidators([Validators.required]);
      this.editStudyForm
        .get("ciclo_grado")
        .setValidators([Validators.required]);
      this.editStudyForm
        .get("ciclo_ciclo")
        .setValidators([Validators.required]);
      this.editStudyForm
        .get("ciclo_fecha")
        .setValidators([Validators.required]);
    } else if (level == 3) {
      console.log("Otros");
      this.editStudyForm
        .get("otro_titulo")
        .setValidators([Validators.required]);
    }
    //actualizamos el valor y las validez de todos los componentes
    Object.keys(this.editStudyForm.controls).forEach((key) => {
      if (key === "level") return;
      this.editStudyForm.controls[key].updateValueAndValidity();
    });
  }

  submitStudy() {
    console.log("Submit del formulario de formación..");
    this.isSubmitted = true;
    if (this.editStudyForm.valid) {
      let studies_to_backend: Study = this.componerEstudioToPersist();
      console.log("Study que se va a enviar al backend: ");
      console.log(studies_to_backend);
      if (this.inEditMode()) {
        /*
        this.userService.editStudy(studies_to_backend).subscribe((data) => {
          console.log("Se ha editado con exito el estudio al usuario");
          this.router.navigate(["/admin/profile"]);
        });
        */
        this.store$.dispatch(
          new UserActions.UpdateStudy(this.user, studies_to_backend)
        );
      } else {
        this.store$.dispatch(
          new UserActions.CreateStudy(this.user, studies_to_backend)
        );
        /*
        this.userService.addStudy(studies_to_backend).subscribe((data) => {
          console.log("Se ha añadido con exito el estudio al usuario");
          this.router.navigate(["/admin/profile"]);
        });
        */
      }
    } else {
      console.log("El formulario no es válido, no hacemos nada");
    }
  }

  /* A partir de los campos submitidos, compone el objeto Study que debemos pasar al backend */
  componerEstudioToPersist(): Study {
    let studies_to_backend: Study;
    let study_submited: Study = {
      uid: this.id_study ? this.id_study : this.user.studies.length + 1,
      level: this.tipos_titulos.find(
        (n) => n.uid == this.editStudyForm.get("level").value
      ),
      title: null,
      certificate: null,
      date: null,
      bilingue: null,
    };
    const level = this.editStudyForm.get("level").value;
    if (level == 3) {
      //otro
      study_submited.title = {
        uid: 1,
        name: this.editStudyForm.get("otro_titulo").value,
      };
      studies_to_backend = study_submited;
    } else if (level == 2) {
      //universidad
      let estudios_universitarios: CollegeStudy = study_submited as CollegeStudy;
      estudios_universitarios.title = {
        uid: 1,
        name: this.editStudyForm.get("universidad_titulo").value,
      };
      estudios_universitarios.date = moment(
        this.editStudyForm.get("universidad_fecha").value,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");
      estudios_universitarios.bilingue = this.editStudyForm.get(
        "universidad_bilingue"
      ).value;
      estudios_universitarios.institution = {
        uid: 1,
        name: this.editStudyForm.get("universidad_centro").value,
      };
      studies_to_backend = estudios_universitarios;
    } else if (level == 1) {
      //ciclo
      let estudios_grado: VocationalStudy = study_submited as VocationalStudy;
      estudios_grado.title = this.ciclos.find(
        (c) => c.uid == this.editStudyForm.get("ciclo_ciclo").value
      );
      estudios_grado.date = moment(
        this.editStudyForm.get("ciclo_fecha").value,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");
      estudios_grado.bilingue = this.editStudyForm.get("ciclo_bilingue").value;
      estudios_grado.grade = this.tipos_grado.find(
        (t) => t.uid == this.editStudyForm.get("ciclo_grado").value
      );
      estudios_grado.category = this.familias_profesionales.find(
        (t) => t.uid == this.editStudyForm.get("ciclo_familia").value
      );

      estudios_grado.dual = this.editStudyForm.get("ciclo_dual").value;
      estudios_grado.institution = this.centros_educativos.find(
        (t) => t.uid == this.editStudyForm.get("ciclo_centro").value
      );
      studies_to_backend = estudios_grado;
    }
    return studies_to_backend;
  }

  /** En funcion del tipo de grado y la familia se mostraran unos ciclos u otros
   * Esto debería calcularse en el backend. Para esta practica, lo simulamos aqui
   */
  changeCiclo(e) {
    console.log("Actualizamos la lista de ciclos..");
    if (
      this.editStudyForm.get("ciclo_familia").value &&
      this.editStudyForm.get("ciclo_grado").value
    ) {
      //si las dos selects estan rellenas, devuelvo una lista de ciclos posibles
      this.ciclos = [
        { uid: 1, name: "Técnico Superior en Desarrollo de Aplicaciones Web" },
        { uid: 2, name: "Administracion de sistemas informaticos y redes" },
        { uid: 3, name: "Otro posible ciclo que vendría desde el backend" },
      ];
    } else {
      this.ciclos = [];
    }
  }

  //Getters para acceder a los diferentes campos en la vista más comodamente
  get level() {
    return this.editStudyForm.get("level");
  }

  get universidad_centro() {
    return this.editStudyForm.get("universidad_centro");
  }
  get universidad_titulo() {
    return this.editStudyForm.get("universidad_titulo");
  }
  get universidad_fecha() {
    return this.editStudyForm.get("universidad_fecha");
  }
  get universidad_bilingue() {
    return this.editStudyForm.get("universidad_bilingue");
  }
  get universidad_certificado() {
    return this.editStudyForm.get("universidad_certificado");
  }
  get ciclo_centro() {
    return this.editStudyForm.get("ciclo_centro");
  }
  get ciclo_familia() {
    return this.editStudyForm.get("ciclo_familia");
  }
  get ciclo_grado() {
    return this.editStudyForm.get("ciclo_grado");
  }
  get ciclo_ciclo() {
    return this.editStudyForm.get("ciclo_ciclo");
  }
  get ciclo_fecha() {
    return this.editStudyForm.get("ciclo_fecha");
  }
  get ciclo_dual() {
    return this.editStudyForm.get("ciclo_dual");
  }
  get ciclo_bilingue() {
    return this.editStudyForm.get("ciclo_bilingue");
  }
  get ciclo_certificado() {
    return this.editStudyForm.get("ciclo_certificado");
  }
  get otro_titulo() {
    return this.editStudyForm.get("otro_titulo");
  }
}
