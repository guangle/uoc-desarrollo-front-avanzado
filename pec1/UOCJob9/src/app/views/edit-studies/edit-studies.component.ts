import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Language, LanguageName } from "../../shared/models/language.model";
import { Study } from "../../shared/models/study.model";
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
    this.editStudyForm = this.fb.group({});
  }

  submitStudy() {}
}
