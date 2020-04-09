import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Store } from "@ngrx/store";
import { AppStore } from "../../shared/state/store.interface";
import { Observable } from "rxjs";
import * as UserSelectors from "../../shared/state/user/selectors/user.selector";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  //public user: User;
  public currentUser$: Observable<any> = this.store$.select(
    UserSelectors.currentUserSelector
  );

  constructor(
    //private userService: UserService,
    private store$: Store<AppStore>,
    private router: Router
  ) {
    //this.user = this.userService.user;
    //console.log(this.user);
    //this.store$.dispatch(new PokemonActions.LoadPokemon());

    this.currentUser$.subscribe((d) => {
      console.log("-----jjgr");
      console.log(d);
    });

    this.store$
      .select((state) => state)
      .subscribe((data) => {
        console.log("data", data);
      });
  }

  ngOnInit() {}

  logout() {
    alert("PENDIENTE");
    //this.userService.clear();
    //this.router.navigate(["/signin"]);
  }
}
