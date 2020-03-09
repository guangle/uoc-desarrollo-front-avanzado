import { Component, OnInit } from "@angular/core";
import { DataService } from "../../shared/services/data.service";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Offer } from "src/app/shared/models/offer.model";

@Component({
  selector: "app-my-offers",
  templateUrl: "./my-offers.component.html",
  styleUrls: ["./my-offers.component.scss"]
})
export class MyOffersComponent implements OnInit {
  public user: User;
  public offers: Offer[];

  constructor(
    private router: Router,
    private dataservice: DataService,
    private userService: UserService
  ) {
    this.user = this.userService.user;
    this.offers = this.user.offers;
  }

  ngOnInit(): void {}
}
