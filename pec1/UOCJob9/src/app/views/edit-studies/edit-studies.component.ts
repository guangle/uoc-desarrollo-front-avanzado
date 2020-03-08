import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Language, LanguageName } from "../../shared/models/language.model";
import {
  Study,
  CollegeStudy,
  VocationalStudy
} from "../../shared/models/study.model";
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { EspaciosValidator } from "../../shared/validators/espacios-validator";
import * as moment from "moment";

@Component({
  selector: "app-edit-studies",
  templateUrl: "./edit-studies.component.html",
  styleUrls: ["./edit-studies.component.scss"]
})
export class EditStudiesComponent implements OnInit {
  public user: User;
  public study: Study;
  public editStudyForm: FormGroup;
  isSubmitted: boolean = false;
  id_study;

  tipos_titulos = [
    { uid: 2, name: "Título universitario" },
    { uid: 1, name: "Ciclo formativo" },
    { uid: 3, name: "Otro título." }
  ];

  centros_educativos = [
    { uid: 1, name: "IES Pablo Ruiz Picasso" },
    { uid: 2, name: "IES Politécnico Jesús Marin" },
    { uid: 3, name: "IES Poeta García Gutiérrez" }
  ];

  familias_profesionales = [
    { uid: 2, name: "Informática y comunicaciones" },
    { uid: 4, name: "Comercio y Marketing" },
    { uid: 5, name: "Administración y Gestión" }
  ];

  tipos_grado = [
    { uid: 1, name: "Ciclo Formativo de Grado Superior" },
    { uid: 2, name: "Ciclo Formativo de Grado Medio" },
    { uid: 3, name: "FP Básica" }
  ];

  ciclos = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    //obtenemos el parametro que indica el identificdor el elemento que estamos editando
    //(en cso de que se trate de una edicion)
    this.id_study = this.route.snapshot.queryParams["id"];
    if (this.inEditMode()) {
      this.study = this.user.studies.find(l => l.uid == this.id_study);
    }
    //Creamos - inicializamos el formulairo reacivo
    this.createForm();
    //Del enunciado se desprende que dependiendo del tipo de estudios (universitario, ciclo..)
    //se deberan validar unos campos u otros. Por tanto, debemos conseguir que nuestras restricciones
    //sean dinámicas. He visto un ejemplo en
    //https://www.codementor.io/@jimohhadi/angular-validators-with-conditional-validation-in-reactive-forms-pj5z7gsq5
    this.updateValidations();
  }

  ngOnInit(): void {}

  /** true si estamos editando un elemento o false si se trata de una creacion */
  inEditMode() {
    return (
      this.id_study != null &&
      this.id_study != "" &&
      this.id_study != "undefined"
    );
  }

  createForm() {
    console.log("Creando el formulario de edición de estudios");
    //usamos forms groups anidados
    this.editStudyForm = this.fb.group({
      level: [2, [Validators.required]],
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
      otro_titulo: [null, []]
    });
  }

  /** Actualiza las validaciones del formulario en función del tipo de estudios seleccionado */
  updateValidations() {
    const levelControl = this.editStudyForm.get("level");
    this.editStudyForm.get("level").valueChanges.subscribe(level => {
      console.log("cambia el level, actualizamos las validaciones");
      //limpiamos las validaciones de los diferentes componentes.
      Object.keys(this.editStudyForm.controls).forEach(key => {
        this.editStudyForm.controls[key].setValidators(null);
      });
      if (level == 2) {
        console.log("Universidad");
      } else if (level == 1) {
        console.log("Cliclo");
      } else if (level == 3) {
        console.log("Otros");
        this.editStudyForm
          .get("otro_titulo")
          .setValidators([Validators.required]);
      }
      //actualizamos el valor y las validez de todos los componentes
      Object.keys(this.editStudyForm.controls).forEach(key => {
        if (key === "level") return;
        this.editStudyForm.controls[key].updateValueAndValidity();
      });
    });
    /*
    const institutionControl = this.form.get('institution');
    const companyControl = this.form.get('company');
    const salaryControl = this.form.get('salary');

    this.form.get('userCategory').valueChanges
      .subscribe(userCategory => {

        if (userCategory === 'student') {
          institutionControl.setValidators([Validators.required]);
          companyControl.setValidators(null);
          salaryControl.setValidators(null);
        }

        if (userCategory === 'employee') {
          institutionControl.setValidators(null);
          companyControl.setValidators([Validators.required]);
          salaryControl.setValidators([Validators.required]);
        }

        institutionControl.updateValueAndValidity();
        companyControl.updateValueAndValidity();
        salaryControl.updateValueAndValidity();
      });
      */
  }

  submitStudy() {
    console.log("Submit del formulario de formación..");
    this.isSubmitted = true;
    if (this.editStudyForm.valid) {
      //datos comunes
      let studies_to_backend: Study;
      let study_submited: Study = {
        uid: this.id_study ? this.id_study : this.user.studies.length + 1,
        level: this.tipos_titulos.find(
          n => n.uid == this.editStudyForm.get("level").value
        ),
        title: null,
        certificate: null,
        date: null,
        bilingue: null
      };
      const level = this.editStudyForm.get("level").value;
      if (level == 3) {
        //otro
        study_submited.title = {
          uid: 1,
          name: this.editStudyForm.get("otro_titulo").value
        };
        studies_to_backend = study_submited;
      } else if (level == 2) {
        //universidad
        let estudios_universitarios: CollegeStudy = study_submited as CollegeStudy;
        estudios_universitarios.title = {
          uid: 1,
          name: this.editStudyForm.get("universidad_titulo").value
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
          name: this.editStudyForm.get("universidad_centro").value
        };
        studies_to_backend = estudios_universitarios;
      } else if (level == 1) {
        //ciclo
        let estudios_grado: VocationalStudy = study_submited as VocationalStudy;
        estudios_grado.title = this.ciclos.find(
          c => c.uid == this.editStudyForm.get("ciclo_ciclo").value
        );
        estudios_grado.date = moment(
          this.editStudyForm.get("ciclo_fecha").value,
          "YYYY-MM-DD"
        ).format("DD/MM/YYYY");
        estudios_grado.bilingue = this.editStudyForm.get(
          "ciclo_bilingue"
        ).value;
        estudios_grado.grade = this.tipos_grado.find(
          t => (t.uid = this.editStudyForm.get("ciclo_grado").value)
        );
        estudios_grado.category = this.familias_profesionales.find(
          t => (t.uid = this.editStudyForm.get("ciclo_familia").value)
        );
        estudios_grado.dual = this.editStudyForm.get("ciclo_dual").value;
        estudios_grado.institution = this.centros_educativos.find(
          t => (t.uid = this.editStudyForm.get("ciclo_centro").value)
        );
        studies_to_backend = estudios_grado;
      }
      if (this.inEditMode()) {
        this.userService.editStudy(studies_to_backend).subscribe(data => {
          console.log("Se ha editado con exito el estudio al usuario");
          this.router.navigate(["/admin/profile"]);
        });
      } else {
        this.userService.addStudy(studies_to_backend).subscribe(data => {
          console.log("Se ha añadido con exito el estudio al usuario");
          this.router.navigate(["/admin/profile"]);
        });
      }
    } else {
      console.log("El formulario no es válido, no hacemos nada");
    }
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
        { uid: 3, name: "Otro posible ciclo que vendría desde el backend" }
      ];
    } else {
      this.ciclos = [];
    }
  }

  //Getters para acceder a los diferentes campos en la vista más comodamente
  get level() {
    return this.editStudyForm.get("level");
  }
}
