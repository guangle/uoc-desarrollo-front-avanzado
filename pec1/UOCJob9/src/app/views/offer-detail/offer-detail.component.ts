import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../shared/services/data.service";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { Offer } from "src/app/shared/models/offer.model";

@Component({
  selector: "app-offer-detail",
  templateUrl: "./offer-detail.component.html",
  styleUrls: ["./offer-detail.component.scss"]
})
export class OfferDetailComponent implements OnInit {
  public user: User;
  public offer: Offer;
  //identificador de la oferta para el cual se está mostrando el detalle
  public id;

  /*boolean para indicar si el usuario esta inscrito a a oferta que se esta visualizando */
  public inscrito: boolean = false;

  //NOTA: los datos de la oferta no los vamos a tener inmediatamente (porque llamamos a un backend asincrono)
  //por lo que en consola se mostrará algún error al renderizar mientras el dato no está disponible.
  //Esto se soluciona con un RouteGuard que nos precarga el elemento antes de llegar a offer-detail, pero he leido
  //en los foros que en esta practica no se van a implementar guardas todavía

  constructor(
    private router: Router,
    private dataservice: DataService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user = this.userService.user;
    this.id = this.route.snapshot.queryParams["id"];
    console.log("Accediendo al detalle de la oferta con ID: " + this.id);

    //obtenemos la oferta llamando al bakend
    this.dataservice.getOffer(this.id).subscribe(o => {
      console.log("Oferta obtenida del backend..");
      this.offer = o;
      this.inscrito = this.user.offers.some(o => o.id == this.id);
    });
  }

  ngOnInit(): void {
    console.log("Oferta detail, on init..");
  }

  /** Inscribe al usuario a la oferta que se está visualizando */
  inscribirOferta() {
    console.log("Se va a inscribir al usuario a la oferta con id " + this.id);
    this.user.offers.push(this.offer);
    this.userService.updateUser(this.user).subscribe(u => {
      console.log("Usuario inscrito a la oferta correctamente");
      this.router.navigate(["/admin/offers/list"]);
    });
  }

  /*Des-inscribe al usuario de la oferta que se está visualizando */
  borrarseOferta() {
    console.log("Se va a borrar al usuario de la oferta con id " + this.id);
    this.user.offers = this.user.offers.filter(o => o.id != this.id);
    this.userService.updateUser(this.user).subscribe(u => {
      console.log("Usuario borrado de la oferta correctamente");
      this.router.navigate(["/admin/offers/list"]);
    });
  }
}
