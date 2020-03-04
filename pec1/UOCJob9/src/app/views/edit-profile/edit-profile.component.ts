import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
  }

}
