import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { formatDate } from "@angular/common";
import { EspaciosValidator } from "../../shared/validators/espacios-validator";
import * as moment from "moment";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
/** Componente encargado de la modificación de los datos de perfil del usuario */
export class EditProfileComponent implements OnInit {
  public user: User;
  public editProfileForm: FormGroup;

  //TODO: temporal hasta futuras practicas (donde irán enlazadas prov y municipio)
  // y procederan del backend
  provincias = ["Cádiz", "Málaga"];
  municipios = ["Chiclana de la Frontera", "Marbella"];
  //TODO: en futuras practicas esto vendrá del backend
  tiposDocumentos = [
    { uid: 1, name: "NIF" },
    { uid: 2, name: "Otro" },
    { uid: 3, name: "Pasaporte" }
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    //Creamos - inicializamos el formulairo reacivo
    this.createForm();
  }

  ngOnInit(): void {}

  editProfile() {
    console.log("Edit profile: submit");
    if (this.editProfileForm.valid) {
      this.user.name = this.editProfileForm.get("name").value;
      this.user.surname = this.editProfileForm.get("surname").value;
      this.user.phone = this.editProfileForm.get("phone").value;
      this.user.phone2 = this.editProfileForm.get("phone2").value;
      //usamos moment.js para parsear la fecha de entrada y guardarla en formato dd/MM/yyyy
      this.user.birthdate = moment(
        this.editProfileForm.get("birthdate").value,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");
      this.user.aboutMe = this.editProfileForm.get("aboutMe").value;
      this.user.otherCompetences = this.editProfileForm.get(
        "otherCompetences"
      ).value;
      this.user.license = this.editProfileForm.get("license").value;
      this.userService.updateUser(this.user).subscribe(newUser => {
        this.user = newUser;
        console.log("Usuario actualizado correctamente");
        //volvemos a la pantalla de perfil
        this.router.navigate(["/admin/profile"]);
      });
    } else {
      console.error(
        "El formulario no es valido, no nos cmunicamos con el backend"
      );
    }
  }

  createForm() {
    console.log("Creando el formulario de edición de perfil");
    this.editProfileForm = this.fb.group({
      name: [
        this.user.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(55),
          EspaciosValidator
        ]
      ],
      surname: [
        this.user.surname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(55),
          EspaciosValidator
        ]
      ],
      birthdate: [
        formatDate(
          moment(this.user.birthdate, "DD/MM/YYYY").toDate(),
          "yyyy-MM-dd",
          "en"
        ),
        [Validators.required]
      ],
      //Teléfonos: No se pondrán restricciones, puesto que hoy en día puede haber números internacionales
      phone: [this.user.phone, []],
      phone2: [this.user.phone2, []],
      documentType: [this.user.documentType.uid, []],
      documentNumber: [this.user.documentNumber, []],
      address: [this.user.address.street, []],
      provincia: [this.user.address.province.name, []],
      municipio: [this.user.address.municipe.name, []],
      license: [
        this.user.license,
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]
      ],
      aboutMe: [
        this.user.aboutMe,
        [Validators.required, Validators.minLength(30)]
      ],
      otherCompetences: [
        this.user.otherCompetences,
        [Validators.required, Validators.minLength(30)]
      ]
    });
    /*
    console.log(this.user.address.province.name);
    this.editProfileForm.controls["provincia"].setValue(
      this.user.address.province.name,
      { onlySelf: true }
    );
    */
  }

  changeProvincia(e) {
    /*
    this.cityName.setValue(e.target.value, {
      onlySelf: true
    })
    */
    console.log("-->");
    console.log(e.target.value);
    //this.municipios = ["Antequera"];
  }

  changeMunicipio(e) {}

  //Getters para acceder a los diferentes campos en la vista más comodamente
  get name() {
    return this.editProfileForm.get("name");
  }
  get surname() {
    return this.editProfileForm.get("surname");
  }
  get birthdate() {
    return this.editProfileForm.get("birthdate");
  }
  get phone() {
    return this.editProfileForm.get("phone");
  }
  get phone2() {
    return this.editProfileForm.get("phone2");
  }
  get documentType() {
    return this.editProfileForm.get("documentType");
  }
  get documentNumber() {
    return this.editProfileForm.get("documentNumber");
  }
  get address() {
    return this.editProfileForm.get("address");
  }
  get provincia() {
    return this.editProfileForm.get("provincia");
  }
  get municipio() {
    return this.editProfileForm.get("municipio");
  }
  get license() {
    return this.editProfileForm.get("license");
  }
  get aboutMe() {
    return this.editProfileForm.get("aboutMe");
  }
  get otherCompetences() {
    return this.editProfileForm.get("otherCompetences");
  }
}
