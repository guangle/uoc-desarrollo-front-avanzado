import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from "../../shared/services/data.service";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { Offer } from 'src/app/shared/models/offer.model';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  public user: User;
  public offer: Offer;
  //identificador de la oferta para el cual se está mostrando el detalle
  public id;

  constructor(
    private router: Router,
    private dataservice: DataService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { 
    this.user = this.userService.user;
    this.id = this.route.snapshot.queryParams["id"];
    console.log('Accediendo al detalle de la oferta con ID: ' + this.id);
    //obtenemos la oferta llamando al bakend
    this.dataservice.getOffer(this.id).subscribe(o => {
      this.offer = o;
    });
  }

  ngOnInit(): void {
  }

}
