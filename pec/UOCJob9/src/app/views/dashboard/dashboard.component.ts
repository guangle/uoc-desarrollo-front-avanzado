import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
    console.log(this.user);
  }

  ngOnInit() {}

  logout() {
    this.userService.clear();
    this.router.navigate(["/signin"]);
  }
}
