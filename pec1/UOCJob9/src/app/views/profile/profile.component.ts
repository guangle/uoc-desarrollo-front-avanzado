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
}
