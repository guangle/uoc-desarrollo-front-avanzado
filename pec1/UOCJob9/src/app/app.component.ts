import { Component } from "@angular/core";
import { MyServicioService } from "./my-servicio.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "UOCJob";
  constructor(private miServicio: MyServicioService) {}

  ngOnInit() {
    console.log("----");
    this.miServicio.getHeroes();
  }
}
