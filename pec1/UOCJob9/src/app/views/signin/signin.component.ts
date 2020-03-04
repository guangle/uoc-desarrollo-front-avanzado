import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { DataService } from "../../shared/services/data.service";
import { UserService } from "../../shared/services/user.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  public loginForm: FormGroup;
  isSubmitted: boolean = false;
  public mensaje: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataservice: DataService,
    private userService: UserService
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
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    console.log("Iniciando Sigin component");
    /*
    console.log('Pruebas llamada fake bakend');
    this.dataservice.getUsers().subscribe(data => {
      console.log(data);
    });

    this.dataservice.getUser(24).subscribe(data => {
      console.log(data);
    });
    */
    console.log('obteniendo ofertas..');
    this.dataservice.getOffers().subscribe(data => {
      console.log("Obertas obtenidas..");
      console.log(data);
    });

  }

  /** Realiza el login consultando al backend y redirige a la pantalla adecuada */
  doLogin() {
    console.log("Realizando login..");
    this.mensaje = "Realizando login..";
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log("hay que realizar el login..");
      //TODO: pdte, realizar validacion de datos contra el backend
      //Vamos al dashboard de usuario
      //this.router.navigate(["/admin/dashboard"]);

      this.userService
        .login(
          this.loginForm.get("email").value,
          this.loginForm.get("password").value
        )
        .subscribe(data => {
          console.log("Se ha realizado el login contra el backend");
          console.log(data);
          if (data != null && data.length == 1) {
            this.userService.user = data[0];
            this.userService.userName = data[0].username;
            //El backend debería devolvernos un token, por ahora lo inventamos
            this.userService.token = this.randomStr(20);
            this.router.navigate(["/admin/dashboard"]);
          } else {
            this.mensaje = "No se ha podido realizar el login en la aplicación";
          }
        });
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

  /*
  Ejemplo de getUsers
  getUsers(){
    this.dataservice.getUsers().subscribe(data => {
      this.users=data;
    });
  }

  //consulta un usuario por ID
  fetchId = 1;

  getUser() {
    this.dataservice.getUser(this.fetchId).subscribe(data => {
      this.user = data;
     this.displayData= true;
    });
  }

  idtoUpdate = 1;
  updateUser() {
    this.dataservice.getUser(this.idtoUpdate).subscribe(data => {
      this.user = data;
      this.user.age = 'Updated Age';
      this.dataservice.updateUser(this.user).subscribe(data1 => {
        this.getUsers();
      });
    });

    idtodelete=1;
  deleteUser() {
    this.dataservice.deleteCar(this.idtodelete).subscribe(data => {
       this.getUsers();
    });
  }

  */
}
