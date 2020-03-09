import { Component, OnInit } from '@angular/core';
import { DataService } from "../../shared/services/data.service";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Offer } from 'src/app/shared/models/offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
/* Componente encargado de mostrar todas las ofertas que sirven para el usuario */
export class OffersComponent implements OnInit {

  public user: User;
  public offers : Offer[];

  constructor(
    private router: Router,
    private dataservice: DataService,
    private userService: UserService
  ) {
    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    console.log("obteniendo ofertas..");
    this.dataservice.getOffers().subscribe(data => {
      console.log("Obertas obtenidas..");
      this.offers = data;
    });
   }

  ngOnInit() {
    
  }

}
