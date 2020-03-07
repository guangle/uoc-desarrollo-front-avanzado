import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-edit-experience",
  templateUrl: "./edit-experience.component.html",
  styleUrls: ["./edit-experience.component.scss"]
})
export class EditExperienceComponent implements OnInit {
  public user: User;
  public experience: Experience;
  public editExperienceForm: FormGroup;
  isSubmitted: boolean = false;
  id_exp;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    //obtenemos el parametro que indica el identificdor de la experiencia que estamos editando
    //(en caso de que se trate de una edicion)
    this.id_exp = this.route.snapshot.queryParams["id"];
    if (this.inEditMode()) {
      console.log(
        "Iniciamos la variable language porque estamos en una edicion"
      );
      this.experience = this.user.experiencies.find(l => l.uid == this.id_exp);
    } else {
      this.experience = {
        uid: 0,
        empresa: null,
        date_inicio: null,
        date_fin: null,
        puesto: null,
        tareas: null
      };
    }
    //Creamos - inicializamos el formulairo reacivo
    this.createForm();
  }

  ngOnInit(): void {}

  inEditMode() {
    return (
      this.id_exp != null && this.id_exp != "" && this.id_exp != "undefined"
    );
  }

  createForm() {
    console.log("Creando el formulario de edición de experiencia");

    this.editExperienceForm = this.fb.group({
      empresa: [null, []],
      date_inicio: [null, []],
      date_fin: [null, []],
      puesto: [null, []],
      tareas: [null, []]
    });
  }

  submitExperience() {
    console.log("Submit del formulario de experiencia..");
    this.isSubmitted = true;
    if (this.editExperienceForm.valid) {
      this.experience.empresa = this.editExperienceForm.get("empresa").value;
      this.experience.date_inicio = moment(
        this.editExperienceForm.get("date_inicio").value,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");
      this.experience.date_fin = moment(
        this.editExperienceForm.get("date_fin").value,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");
      this.experience.puesto = this.editExperienceForm.get("puesto").value;
      this.experience.tareas = this.editExperienceForm.get("tareas").value;
      if (this.inEditMode()) {
        this.experience.uid = this.id_exp;
      } else {
        this.experience.uid = this.user.experiencies.length + 1;
      }
      if (this.inEditMode()) {
        //Actualizamos la experiencia
      } else {
        //Creamos una nueva experiencia para el usuario
        this.userService.addExperience(this.experience).subscribe(data => {
          console.log("Se ha añadido con exito la experincia al usuario");
          this.user = data;
          this.router.navigate(["/admin/profile"]);
        });
      }
    } else {
      console.log(
        "No se guardan los datos de la experiencia en el backend porque el form no es valido"
      );
    }
  }
}
