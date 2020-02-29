import { Component, OnInit } from "@angular/core";
import { MyServicioService } from "../../my-servicio.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  constructor(private miServicio: MyServicioService) {}

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
}
