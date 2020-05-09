import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as AuthSelectors from "../../shared/state/auth/selectors/auth.selector";
import * as AuthActions from "../../shared/state/auth/actions/auth.actions";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          height: "180px",
          opacity: 1,
          display: "block",
          backgroundColor: "#f1e9da",
        })
      ),
      state(
        "closed",
        style({
          height: "0px",
          opacity: 0,
        })
      ),
      transition("open => closed", [animate("0.8s")]),
      transition("closed => open", [animate("0.4s")]),
    ]),
  ],
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
    private router: Router
  ) {
    this.createForm();

    this.authInfo$.subscribe((login_state) => {
      console.log("Algo ha cambiado en el estado del login");
      console.log("login_state", login_state);

      if (login_state.logged) {
        if ("user" === login_state.type) {
          //Se ha logado un usuario, vamos al dashboard principal
          //this.router.navigate(["/admin/dashboard"]);
          //La inclusión de la plantilla ha provocado que refactorice las rutas
          this.router.navigate(["/uojobs/users/dashboard"]);
        } else if ("company" === login_state.type) {
          //Se ha logado una empresa, vamos al dashboard de empresa
          this.router.navigate(["/uojobs/companies/dashboard"]);
        }
      }
    });
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

  //Adaptamos el ejemplo de animación
  //https://angular.io/guide/animations
  //para mostrar la ayuda
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
