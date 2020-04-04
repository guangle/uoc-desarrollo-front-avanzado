import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../shared/services/company.service";
import { Company } from "../../shared/models/company.model";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { formatDate } from "@angular/common";
import { EspaciosValidator } from "../../shared/validators/espacios-validator";
import { NumeroIdentificacionValidator } from "../../shared/validators/numero-identificacion-validator";
import * as moment from "moment";

@Component({
  selector: "app-edit-profile-company",
  templateUrl: "./edit-profile-company.component.html",
  styleUrls: ["./edit-profile-company.component.scss"]
})
/** Componente encargado de la modificación de los datos de perfil del usuario */
export class EditProfileCompanyComponent implements OnInit {
  public company: Company;
  public editProfileCompanyForm: FormGroup;

  //TODO: temporal hasta futuras practicas (donde estos datos vendrán del backend)
  provincias = [
    {
      uid: 1,
      name: "Málaga",
      municipios: [
        { uid: 7, name: "Estepona" },
        { uid: 8, name: "Campanillas (PTA)" }
      ]
    },
    {
      uid: 2,
      name: "Sevilla",
      municipios: [
        { uid: 2, name: "Sevilla" },
        { uid: 10, name: "Osuna" },
        { uid: 11, name: "Mairena" }
      ]
    },
    {
      uid: 4,
      name: "Cádiz",
      municipios: [
        { uid: 6, name: "Chiclana de la Frontera" },
        { uid: 2, name: "San Fernando" }
      ]
    },
    { uid: 5, name: "Granada", municipios: [{ uid: 9, name: "Motril" }] }
  ];
  municipios = [];

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    //Llegados a este punto, tenemos la empresa logada en la aplicacion que custodia companyService
    this.company = this.companyService.company;
    //Creamos - inicializamos el formulairo reacivo
    this.createForm();
  }

  ngOnInit(): void {}

  /** Actualiza el perfil de la empresa llamando al backend */
  editProfileCompany() {
    if (this.editProfileCompanyForm.valid) {
      //1. Actualizamos los datos de la empresa con lo procedente del form
      this.company.nombre_comercial = this.editProfileCompanyForm.get(
        "nombre_comercial"
      ).value;
      this.company.razon_social = this.editProfileCompanyForm.get(
        "razon_social"
      ).value;
      this.company.cif = this.editProfileCompanyForm.get("cif").value;
      this.company.direccion.street = this.editProfileCompanyForm.get(
        "direccion"
      ).value;

      this.company.direccion.province = this.provincias.find(
        p => p.uid == this.editProfileCompanyForm.get("provincia").value
      );
      this.company.direccion.municipe = this.municipios.find(
        p => p.uid == this.editProfileCompanyForm.get("municipio").value
      );

      this.company.url = this.editProfileCompanyForm.get("url").value;
      this.company.contacto.contacto_nombre = this.editProfileCompanyForm.get(
        "contacto_nombre"
      ).value;
      this.company.contacto.contacto_telefono = this.editProfileCompanyForm.get(
        "contacto_telefono"
      ).value;
      this.company.contacto.contacto_mail = this.editProfileCompanyForm.get(
        "contacto_mail"
      ).value;

      //2. Realizo una llamada al servicio de negocio para actualizar el usuario en el back
      this.companyService.updateCompany(this.company).subscribe(newCompany => {
        this.company = newCompany;
        console.log("Empresa actualizado correctamente");
        //volvemos a la pantalla dashboard
        this.router.navigate(["/companies/dashboard-company"]);
      });
    } else {
      console.error(
        "El formulario no es valido, no nos cmunicamos con el backend"
      );
    }
  }

  /** Crea un nuevo formulario reacitvo para editar el perfil de empresa */
  createForm() {
    console.log("Creando el formulario de edición de perfil de empresa");
    //En primera instancia, cargaremos los municipios de la provincia actual del usuario
    this.municipios = this.provincias.find(
      p => p.uid == this.company.direccion.province.uid
    ).municipios;

    //Expresion regular para validar la url
    const urlRegExp =
      "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$";

    this.editProfileCompanyForm = this.fb.group({
      nombre_comercial: [
        this.company.nombre_comercial,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          EspaciosValidator
        ]
      ],
      razon_social: [
        this.company.razon_social,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          EspaciosValidator
        ]
      ],
      cif: [this.company.cif, []],
      direccion: [this.company.direccion.street, [Validators.required]],
      provincia: [this.company.direccion.province.uid, [Validators.required]],
      municipio: [this.company.direccion.municipe.uid, [Validators.required]],

      url: [
        this.company.url,
        [Validators.required, Validators.pattern(urlRegExp)]
      ],
      contacto_nombre: [
        this.company.contacto.contacto_nombre,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          EspaciosValidator
        ]
      ],
      contacto_telefono: [
        this.company.contacto.contacto_telefono,
        [
          Validators.required
        ]
      ],
      contacto_mail: [
        this.company.contacto.contacto_mail,
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }

  // Ante un cambio de la provincia en el formulario, debemos actualizar la lista de municipios
  changeProvincia(e) {
    if (!this.editProfileCompanyForm.get("provincia").value) {
      this.municipios = [];
    } else {
      this.municipios = this.provincias.find(
        p => p.uid == this.editProfileCompanyForm.get("provincia").value
      ).municipios;
    }
  }

  //Getters para acceder a los diferentes campos en la vista más comodamente
  get nombre_comercial() {
    return this.editProfileCompanyForm.get("nombre_comercial");
  }

  get razon_social() {
    return this.editProfileCompanyForm.get("razon_social");
  }

  get cif() {
    return this.editProfileCompanyForm.get("cif");
  }

  get direccion() {
    return this.editProfileCompanyForm.get("direccion");
  }

  get provincia() {
    return this.editProfileCompanyForm.get("provincia");
  }

  get municipio() {
    return this.editProfileCompanyForm.get("municipio");
  }

  get url() {
    return this.editProfileCompanyForm.get("url");
  }

  get contacto_nombre() {
    return this.editProfileCompanyForm.get("contacto_nombre");
  }

  get contacto_telefono() {
    return this.editProfileCompanyForm.get("contacto_telefono");
  }

  get contacto_mail() {
    return this.editProfileCompanyForm.get("contacto_mail");
  }
}
