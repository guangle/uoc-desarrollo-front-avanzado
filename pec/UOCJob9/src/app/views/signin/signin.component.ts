import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { DataService } from "../../shared/services/data.service";
import { UserService } from "../../shared/services/user.service";
import { CompanyService } from "../../shared/services/company.service";

import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as AuthSelectors from "../../shared/state/auth/selectors/auth.selector";
import * as AuthActions from "../../shared/state/auth/actions/auth.actions";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit {
  public loginForm: FormGroup;
  isSubmitted: boolean = false;
  public mensaje: string;

  public authInfo$: Observable<any> = this.store$.select(
    AuthSelectors.selectAuthState
  );

  constructor(
    //pec2, inyectamos el store al componente
    private store$: Store<AppStore>,
    private fb: FormBuilder,
    private router: Router,
    private dataservice: DataService,
    private userService: UserService,
    private companyService: CompanyService
  ) {
    this.createForm();

    this.authInfo$.subscribe((login_state) => {
      console.log("Algo ha cambiado en el estado del login");
      console.log("login_state", login_state);
      if (login_state.logged) {
        if ("user" === login_state.type) {
          //Se ha logado un usuario, vamos al dashboard principal
          this.router.navigate(["/admin/dashboard"]);
        } else if ("company" === login_state.type) {
          //Se ha logado una empresa, vamos al dashboard de empresa
          this.router.navigate(["/companies/dashboard-company"]);
        }
      }
    });

    /*
    this.store$.dispatch(
      new AuthActions.LoginUser("guangle@gmail.com", "1234")
    );
    */
  }

  /** Inicia el formulario de login haciendo uso del formBuilder */
  createForm() {
    this.loginForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.minLength(10), Validators.email],
      ],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}

  /** Realiza el login consultando al backend y redirige a la pantalla adecuada */
  doLogin() {
    console.log("Realizando login..");
    this.mensaje = "Realizando login..";
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log("Hay que realizar el login..");
      //Esta vez, no utilizamos los servicios de negocio, si no que
      //invocamos a la acción adecuada
      this.store$.dispatch(
        new AuthActions.LoginUser(
          this.loginForm.get("email").value,
          this.loginForm.get("password").value
        )
      );
      //Se simplica bastante el componente, he quitado mucha lógica de negocio de aqui
    } else {
      console.log("El formulario no es válido, no realizamos el login");
      this.mensaje = "El formulario no es válido, no realizamos el login";
    }
  }

  /*  Método que se ejecuta tas el login fallido contra la BBDD de usuario. Intenta realizar un login
  contra el conjunto de empresas. De esta forma, reaprovechamos la pantalla de login para autenticar
  a estudiantes y compañias */
  tryLoginCompany(mail: string, password: string) {
    this.companyService.login(mail, password).subscribe((data) => {
      console.log(
        "Se ha realizado el login contra el backend para intentar identificar a una empresa"
      );
      console.log(data);
      if (data != null && data.length == 1) {
        this.companyService.company = data[0];
        this.companyService.companyName = data[0].nombre_comercial;
        //El backend debería devolvernos un token, por ahora lo inventamos
        this.userService.token = this.randomStr(20);

        this.router.navigate(["/companies/dashboard-company"]);
      } else {
        this.mensaje = "No se ha podido realizar el login en la aplicación";
      }
    });
  }

  //Getters para acceder a los diferentes campos en la vista más comodamente
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  randomStr(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
