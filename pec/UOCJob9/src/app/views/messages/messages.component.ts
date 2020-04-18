import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import * as UsersSelectors from "../../shared/state/user/selectors/user.selector";
import * as AuthSelectors from "../../shared/state/auth/selectors/auth.selector";
import * as CompanySelectors from "../../shared/state/company/selectors/company.selector";
import * as OfferSelectors from "../../shared/state/offer/selectors/offer.selector";

//Instalé el paquete Material SnackBar para ir dando mensajes de confirmación/error al usuario.
//Entiendo que esta parte se desarrollará en profundidad en la pec relacionada con el styling de
//la aplicación

import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {
  //El componente va observando los diferentes mensajes de los stores para mostrar snackbars
  //con información para el usuario

  public messageAuth$: Observable<any> = this.store$.select(
    AuthSelectors.authMessageSelector
  );

  public userMessageSelector$: Observable<any> = this.store$.select(
    UsersSelectors.userMessageSelector
  );

  public companyMessageSelector$: Observable<any> = this.store$.select(
    CompanySelectors.companyMessageSelector
  );

  public offerMessageSelector$: Observable<any> = this.store$.select(
    OfferSelectors.offerMessageSelector
  );

  //Le inyectamos al constructor el store de la aplicación asi como el obj para crear snackbars
  constructor(private store$: Store<AppStore>, public snackBar: MatSnackBar) {
    //Estamos observando los mensajes que pueden aparecer en las 3 princpales partes del store de la aplicación
    //Ante cualquier cambio, mostramos un SnackBar al usuario

    this.messageAuth$.subscribe((msg) => {
      this.proccessMsg(msg);
    });

    this.userMessageSelector$.subscribe((msg) => {
      this.proccessMsg(msg);
    });

    this.companyMessageSelector$.subscribe((msg) => {
      this.proccessMsg(msg);
    });

    this.offerMessageSelector$.subscribe((msg) => {
      this.proccessMsg(msg);
    });
  }

  ngOnInit(): void {}

  proccessMsg(msg: string) {
    if (!msg || msg == "") return;
    this.snackBar.open(msg, "OK", {
      duration: 1500,
    });
  }

  //Nota:
  //He visto que en el código de base sobre el que partimos hay un NotificacionService y se
  //hace uso del componente MatSnackBar por lo que ya se resctará en futuras pec
}
