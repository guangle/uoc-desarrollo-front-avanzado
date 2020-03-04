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
/** Componente encargado de la modificación de los datos de perfil del usuario */
export class EditProfileComponent implements OnInit {

  public user: User;
  public editProfileForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    //Llegados a este punto, tenemos un usuario logado en la aplicacion que custodia usuarioService
    this.user = this.userService.user;
    //Creamos - inicializamos el formulairo reacivo
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
      
      name: [
        this.user.name,
        [Validators.required, Validators.minLength(3)]
      ],
      surname: [this.user.surname, [Validators.required, Validators.minLength(4)]]
      
    });
  }

}
