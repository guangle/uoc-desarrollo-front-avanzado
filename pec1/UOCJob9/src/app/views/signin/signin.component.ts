import { Component, OnInit } from "@angular/core";
import { MyServicioService } from "../../my-servicio.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  public loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private miServicio: MyServicioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  /** Inicia el formulario de login haciendo uso del formBuilder */
  createForm() {
    this.loginForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.minLength(10), Validators.email]
      ],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    console.log("Dentro del signincomponent v2");
    let a = this.miServicio.getHeroes();
    console.log(a);
    a.then(resp => {
      console.log("\tTermina la promesa");
      console.log(resp);
    });
    console.log("Fin del onInit de SiginComponent");
  }

  /** Realiza el login consultando al backend y redirige a la pantalla adecuada */
  doLogin() {
    console.log("Realizando login..");
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log("hay que realizar el login..");
      //TODO: pdte, realizar validacion de datos contra el backend
      //Vamos al dashboard de usuario
      this.router.navigate(["/admin/dashboard"]);
    } else {
      console.log("El formulario no es válido, no realizamos el login");
    }
  }

  //Getters para acceder a los diferentes campos en la vista más comodamente
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
}
