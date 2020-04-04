import { Component, OnInit } from "@angular/core";
import { CompanyService } from "src/app/shared/services/company.service";
import { Router } from "@angular/router";
import { Company } from "../../shared/models/company.model";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { Language, LanguageName } from "src/app/shared/models/language.model";

@Component({
  selector: "app-company-configuration",
  templateUrl: "./company-configuration.component.html",
  styleUrls: ["./company-configuration.component.scss"]
})
export class CompanyConfigurationComponent implements OnInit {
  //NOTA: el enunciado es confuso...
  //en el título de la sección pone literalmente "Pantalla CONFIGURACIÓN (Empresa)"
  //pero después pide que se implemente una lista de checks con las provincias para
  //"recibir notificaciones de nuevas ofertas a su correo electrónico"
  //¿No sería más apropiado implementar esta funcionalidad para el usuario?

  //De momento, únicamente permito configurar el idioma

  public company: Company;

  public configurationForm: FormGroup;
  isSubmitted: boolean = false;

  idiomas: LanguageName[] = [
    { uid: 1, name: "Inglés" },
    { uid: 2, name: "Francés" },
    { uid: 3, name: "Italiano" },
    { uid: 4, name: "Chino" },
    { uid: 6, name: "Castellano" }
  ];

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.company = this.companyService.company;
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    console.log(
      "Creando el formulario de edición de configuración de la empresa"
    );

    console.log("..");
    console.log(this.company.idioma_app.uid);

    this.configurationForm = this.fb.group({
      language: [this.company.idioma_app.uid, [Validators.required]]
    });
  }

  submitConfiguration() {
    console.log("Se submite la configuración de la empresa");
    this.isSubmitted = true;
    if (this.configurationForm.valid) {
      this.company.idioma_app = this.idiomas.find(
        i => i.uid == this.configurationForm.get("language").value
      );
      this.companyService.updateCompany(this.company).subscribe(c => {
        console.log("Configuración actualizada correctamente..");
        this.router.navigate(["/companies/dashboard-company"]);
      });
    } else {
      console.log("El formulario no es válido, no se puede almacenar");
    }
  }
}
