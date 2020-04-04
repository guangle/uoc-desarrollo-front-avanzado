import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Language, LanguageName } from "../../shared/models/language.model";
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { EspaciosValidator } from "../../shared/validators/espacios-validator";
import * as moment from "moment";

@Component({
  selector: "app-edit-languages",
  templateUrl: "./edit-languages.component.html",
  styleUrls: ["./edit-languages.component.scss"]
})
export class EditLanguagesComponent implements OnInit {
  public user: User;
  public language: Language;
  public editLanguajeForm: FormGroup;
  isSubmitted: boolean = false;
  //identificador del lenguaje que se esta editando (si se trata de una edición)
  id_lang;

  //Tal y como indica el enunciado, de momento inicializamos los arrays en los componentes
  //aunque en un ejemplo real estos datos ddeberían venir del backend. En futuras practicas
  //cuando el volumen de trabajo no sea tan elevado lo llevaré al memory-data-service

  posibles_lenguas = [
    { uid: 1, name: "Inglés" },
    { uid: 2, name: "Francés" },
    { uid: 3, name: "Italiano" },
    { uid: 4, name: "Chino" },
    { uid: 5, name: "Otro" }
  ];

  niveles = [
    { uid: 1, name: "A1" },
    { uid: 2, name: "A2" },
    { uid: 3, name: "B1" },
    { uid: 4, name: "B2" },
    { uid: 5, name: "C1" },
    { uid: 6, name: "C2" }
  ];

  

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    //obtenemos el parametro que indica el identificdor de lenguaje que estamos editando
    //(en cso de que se trate de una edicion)
    this.id_lang = this.route.snapshot.queryParams["id"];

    if (this.inEditMode()) {
      console.log("Iniciamos la variable language porque estamos en una edicion");
      this.language = this.user.languages.find(l => l.uid == this.id_lang);
    }
    //Creamos - inicializamos el formulairo reacivo
    this.createForm();
  }

  ngOnInit(): void {}

  /** true si estamos editando un lenguaje, false si estamos creando un nuevo */
  inEditMode() {
    return (
      this.id_lang != null && this.id_lang != "" && this.id_lang != "undefined"
    );
  }

  /* Crea e inicia el formulario reactivo de idioma */
  createForm() {
    console.log("Creando el formulario de edición de idioma");
    const otroIdioma =
      this.language && this.language.name.uid == 5
        ? this.language.name.name
        : "";
    //Creamos el form llamando al formbuilder. Le damos un valor por defecto si 
    //estamos ante una edición

    //Nota: al no estar definidas, hemos implementado las validaciones básicas (campos requeridos)
    //Se podrían haber implementado validaciones más complejas como se ha realizado en el perfil
    //de usuario o los estudios

    this.editLanguajeForm = this.fb.group({
      name: [this.language ? this.language.name.uid : null, [ Validators.required ]],
      other: [otroIdioma, []],
      level: [this.language ? this.language.level.uid : null, [ Validators.required ]],
      date: [
        this.language
          ? formatDate(
              moment(this.language.date, "DD/MM/YYYY").toDate(),
              "yyyy-MM-dd",
              "en"
            )
          : null,
        [Validators.required]
      ]
    });
  }

  /* El usuario ha pulsado el boton submit, creamos/actualizamos el idioma */
  submitLanguaje() {
    console.log("Submit del formulario de idioma");
    this.isSubmitted = true;
    //Esto realmente es redundante, porque el boton no se activa mientras el formulario no sea válido
    if (this.editLanguajeForm.valid) {
      let name_submited: LanguageName;
      if (this.editLanguajeForm.get("name").value == 5) {
        name_submited = {
          uid: 5,
          name: this.editLanguajeForm.get("other").value
        };
      } else {
        name_submited = this.posibles_lenguas.find(
          l => l.uid == this.editLanguajeForm.get("name").value
        );
      }
      //Objeto para enviar al backend
      let lang_object: Language = {
        uid: this.id_lang ? this.id_lang : this.user.languages.length + 1,
        level: this.niveles.find(
          n => n.uid == this.editLanguajeForm.get("level").value
        ),
        name: name_submited,
        date: moment(
          this.editLanguajeForm.get("date").value,
          "YYYY-MM-DD"
        ).format("DD/MM/YYYY")
      };

      if (this.inEditMode()) {
        this.userService.editLanguage(lang_object).subscribe(data => {
          console.log("Se ha editado con exito el lenguaje al usuario");
          this.router.navigate(["/admin/profile"]);
        });
      } else {
        this.userService.addLanguage(lang_object).subscribe(data => {
          console.log("Se ha añadido con exito el lenguaje al usuario");
          this.router.navigate(["/admin/profile"]);
        });
      }
    } else {
      console.error("El formulario es invalido, no relizamos ninguna acción");
    }
  }

  //Getters para acceder a los diferentes campos en la vista más comodamente
  get name() {
    return this.editLanguajeForm.get("name");
  }
  get other() {
    return this.editLanguajeForm.get("other");
  }
  get level() {
    return this.editLanguajeForm.get("level");
  }
  get date() {
    return this.editLanguajeForm.get("date");
  }
}
