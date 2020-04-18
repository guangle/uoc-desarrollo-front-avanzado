import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { DataService } from "../../shared/services/data.service";
import { UserService } from "../../shared/services/user.service";
import { CompanyService } from "../../shared/services/company.service";

import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as AuthSelectors from "../../shared/state/auth/selectors/auth.selector";
import * as AuthActions from "../../shared/state/auth/actions/auth.actions";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  public recoverForm: FormGroup;
  isSubmitted: boolean = false;

  public authMessageSelector$: Observable<any> = this.store$.select(
    AuthSelectors.authMessageSelector
  );
  public rememberStatusSelector$: Observable<any> = this.store$.select(
    AuthSelectors.rememberStatusSelector
  );

  constructor(
    private store$: Store<AppStore>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  /** Inicia el formulario de login haciendo uso del formBuilder */
  createForm() {
    this.recoverForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.minLength(10), Validators.email],
      ],
    });
  }

  sendRecover() {
    console.log("Enviando una petición de recuperación de contraseña");
    this.isSubmitted = true;
    if (this.recoverForm.valid) {
      this.store$.dispatch(
        new AuthActions.RememberPassword(this.recoverForm.get("email").value)
      );
    } else {
      console.log(
        "El formulario no es válido, no realizamos la petición de recuperación"
      );
    }
  }

  volverSignin() {
    this.store$.dispatch(new AuthActions.RememberPasswordClear());
  }

  ngOnInit() {}

  get email() {
    return this.recoverForm.get("email");
  }
}
