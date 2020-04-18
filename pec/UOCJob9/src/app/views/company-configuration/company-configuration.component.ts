import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CompanyService } from "src/app/shared/services/company.service";
import { Router } from "@angular/router";
import { Company } from "../../shared/models/company.model";
import { FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { Language, LanguageName } from "src/app/shared/models/language.model";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as CompanyActions from "../../shared/state/company/actions/company.actions";
import { cloneDeep } from "lodash";
import * as CompanySelectors from "../../shared/state/company/selectors/company.selector";

@Component({
  selector: "app-company-configuration",
  templateUrl: "./company-configuration.component.html",
  styleUrls: ["./company-configuration.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyConfigurationComponent implements OnInit {
  //NOTA (pec1): el enunciado es confuso...
  //en el título de la sección pone literalmente "Pantalla CONFIGURACIÓN (Empresa)"
  //pero después pide que se implemente una lista de checks con las provincias para
  //"recibir notificaciones de nuevas ofertas a su correo electrónico"
  //¿No sería más apropiado implementar esta funcionalidad para el usuario?

  //De momento, únicamente permito configurar el idioma

  public company: Company;
  public currentCompany$: Observable<any> = this.store$.select(
    CompanySelectors.currentCompanySelector
  );

  public configurationForm: FormGroup;
  isSubmitted: boolean = false;

  idiomas: LanguageName[] = [
    { uid: 1, name: "Inglés" },
    { uid: 2, name: "Francés" },
    { uid: 3, name: "Italiano" },
    { uid: 4, name: "Chino" },
    { uid: 6, name: "Castellano" },
  ];

  constructor(private store$: Store<AppStore>, private fb: FormBuilder) {
    //Llegados a este punto, tenemos una empresa en el store
    this.currentCompany$.subscribe((c) => {
      console.log("currentCompany", c);
      this.company = c;
      //Creamos el formulario, precargando con los datos del store
      this.createForm();
    });
  }

  ngOnInit(): void {}

  createForm() {
    console.log(
      "Creando el formulario de edición de configuración de la empresa"
    );

    this.configurationForm = this.fb.group({
      language: [this.company.idioma_app.uid, [Validators.required]],
    });
  }

  submitConfiguration() {
    console.log("Se submite la configuración de la empresa");
    this.isSubmitted = true;
    if (this.configurationForm.valid) {
      let companySubmited = cloneDeep(this.company);
      companySubmited.idioma_app = this.idiomas.find(
        (i) => i.uid == this.configurationForm.get("language").value
      );
      this.store$.dispatch(new CompanyActions.UpdateCompany(companySubmited));
    } else {
      console.log("El formulario no es válido, no se puede almacenar");
    }
  }
}
