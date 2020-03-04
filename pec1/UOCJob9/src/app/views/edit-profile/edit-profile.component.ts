import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/models/user.model";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public user: User;
  public editProfileForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.user = this.userService.user;
    this.createForm();
  }

  ngOnInit(): void {
  }

  editProfile() {
    console.log('Edit profile: submit');
  }

  createForm() {
    console.log('Creando el formulario de edición de perfil');
    this.editProfileForm = this.fb.group({
      /*
      email: [
        null,
        [Validators.required, Validators.minLength(10), Validators.email]
      ],
      password: [null, [Validators.required, Validators.minLength(4)]]
      */
    });
  }

}
