import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
  }

  ngOnInit() {}

  /** Borra el lenguaje del usuario cuyo id se pasa como parametro */
  deleteLanguaje(id) {
    console.log("Se va a borrar el lenguaje del usuario con id: " + id);
    this.userService.deleteLanguaje(id).subscribe(data => {
      console.log("Usuario actualizado tras borrar el lenguaje");
      this.user = data;
    });
  }

  /** Elimina el estudio del usuario cuyo id se pasa como parametro  */
  deleteStudies(id) {
    console.log("Se va a borrar la formacion del usuario con id: " + id);
    this.userService.deleteStudies(id).subscribe(data => {
      console.log("Usuario actualizado tras borrar la formacion");
      this.user = data;
    });
  }

  /** Elimina la experiencia del usuario cuyo id se pasa como parametro */
  deleteExperience(id) {
    console.log("Se va a borrar la experiecia del usuario con id: " + id);
    this.userService.deleteExperience(id).subscribe(data => {
      console.log("Usuario actualizado tras borrar la experiencia");
      this.user = data;
    });
  }
}
