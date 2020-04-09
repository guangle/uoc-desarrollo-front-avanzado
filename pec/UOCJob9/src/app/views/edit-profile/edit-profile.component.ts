import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { formatDate } from "@angular/common";
import { EspaciosValidator } from "../../shared/validators/espacios-validator";
import { NumeroIdentificacionValidator } from "../../shared/validators/numero-identificacion-validator";
import * as moment from "moment";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";
import * as UserActions from "../../shared/state/user/actions/user.actions";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Componente encargado de la modificación de los datos de perfil del usuario */
export class EditProfileComponent implements OnInit {
  public user: User;
  public editProfileForm: FormGroup;

  //TODO: temporal hasta futuras practicas (donde estos datos vendrán del backend)

  provincias = [
    {
      uid: 1,
      name: "Málaga",
      municipios: [
        { uid: 7, name: "Estepona" },
        { uid: 8, name: "Campanillas (PTA)" },
      ],
    },
    {
      uid: 2,
      name: "Sevilla",
      municipios: [
        { uid: 10, name: "Osuna" },
        { uid: 11, name: "Mairena" },
      ],
    },
    {
      uid: 4,
      name: "Cádiz",
      municipios: [
        { uid: 6, name: "Chiclana de la Frontera" },
        { uid: 2, name: "San Fernando" },
      ],
    },
    { uid: 5, name: "Granada", municipios: [{ uid: 9, name: "Motril" }] },
  ];
  municipios = [];

  //TODO: en futuras practicas esto vendrá del backend
  tiposDocumentos = [
    { uid: 1, name: "NIF" },
    { uid: 2, name: "Otro" },
    { uid: 3, name: "Pasaporte" },
  ];

  //Observamos el usuario actual del store, que es sobre el que vamos a trabajar
  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  constructor(
    private userService: UserService,
    //TODO: pendiene, hay que quitar el servicio de aqui
    private store$: Store<AppStore>,
    private router: Router,
    private fb: FormBuilder
  ) {
    //Llegados a este punto, tenemos un usuario en el store
    this.currentUser$.subscribe((u) => {
      console.log("currentUser", u);
      this.user = u;
      this.createForm();
    });
    /*
    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    //Creamos - inicializamos el formulairo reacivo
    this.createForm();
    */
  }

  ngOnInit(): void {}

  /** Actualiza el perfil del usuario llamando al backend */
  editProfile() {
    console.log("Edit profile: submit");
    if (this.editProfileForm.valid) {
      /*
      let userSubmited = {
        ...this.user,
      };

      console.log(userSubmited);
      userSubmited = Object.create(this.user);
      */
      //let userSubmited = Object.assign({}, this.user);
      //COMENTAR, LO HAGO ASI PORQUE EL SPREAD OPERATOR NO ES DEEP
      let userSubmited = JSON.parse(JSON.stringify(this.user));

      //1. Actualizamos los datos del usuario con lo procedente del form
      userSubmited.name = this.editProfileForm.get("name").value;
      userSubmited.surname = this.editProfileForm.get("surname").value;
      userSubmited.phone = this.editProfileForm.get("phone").value;
      userSubmited.phone2 = this.editProfileForm.get("phone2").value;
      //usamos moment.js para parsear la fecha de entrada y guardarla en formato dd/MM/yyyy
      userSubmited.birthdate = moment(
        this.editProfileForm.get("birthdate").value,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");

      userSubmited.address.province = this.provincias.find(
        (p) => p.uid == this.editProfileForm.get("provincia").value
      );
      userSubmited.address.municipe = this.municipios.find(
        (p) => p.uid == this.editProfileForm.get("municipio").value
      );

      userSubmited.aboutMe = this.editProfileForm.get("aboutMe").value;
      userSubmited.otherCompetences = this.editProfileForm.get(
        "otherCompetences"
      ).value;

      userSubmited.documentNumber = this.editProfileForm.get(
        "documentNumber"
      ).value;
      userSubmited.documentType = this.tiposDocumentos.find(
        (t) => t.uid == this.editProfileForm.get("documentType").value
      );
      //Nuevo PEC2: invoca a la acción para actualizar el usuario
      this.store$.dispatch(new UserActions.UpdateUser(userSubmited));

      /*

      //2. Realizo una llamada al servicio de negocio para actualizar el usuario en el back
      this.userService.updateUser(this.user).subscribe((newUser) => {
        this.user = newUser;
        console.log("Usuario actualizado correctamente");
        //volvemos a la pantalla de perfil
        this.router.navigate(["/admin/profile"]);
      });

      */
    } else {
      console.error(
        "El formulario no es valido, no nos cmunicamos con el backend"
      );
    }
  }

  /** Crea un nuevo formulario reacitvo para editar el perfil de usuario */
  createForm() {
    console.log("Creando el formulario de edición de perfil");
    //En primera instancia, cargaremos los municipios de la provincia actual del usuario
    this.municipios = this.provincias.find(
      (p) => p.uid == this.user.address.province.uid
    ).municipios;
    this.editProfileForm = this.fb.group(
      {
        name: [
          this.user.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(55),
            EspaciosValidator,
          ],
        ],
        surname: [
          this.user.surname,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(55),
            EspaciosValidator,
          ],
        ],
        birthdate: [
          formatDate(
            moment(this.user.birthdate, "DD/MM/YYYY").toDate(),
            "yyyy-MM-dd",
            "en"
          ),
          [Validators.required],
        ],
        //Teléfonos: No se pondrán restricciones, puesto que hoy en día puede haber números internacionales
        phone: [this.user.phone, []],
        phone2: [this.user.phone2, []],
        documentType: [this.user.documentType.uid, []],
        documentNumber: [this.user.documentNumber, []],
        address: [this.user.address.street, [Validators.required]],
        provincia: [this.user.address.province.uid, [Validators.required]],
        municipio: [this.user.address.municipe.uid, [Validators.required]],
        license: [
          this.user.license,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        ],
        aboutMe: [
          this.user.aboutMe,
          [Validators.required, Validators.minLength(30)],
        ],
        otherCompetences: [
          this.user.otherCompetences,
          [Validators.required, Validators.minLength(30)],
        ],
      },
      { validator: NumeroIdentificacionValidator }
    );
  }

  // Ante un cambio de la provincia en el formulario, debemos actualizar la lista de municipios
  changeProvincia(e) {
    if (!this.editProfileForm.get("provincia").value) {
      this.municipios = [];
    } else {
      this.municipios = this.provincias.find(
        (p) => p.uid == this.editProfileForm.get("provincia").value
      ).municipios;
    }
  }

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
