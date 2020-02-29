import { Component, OnInit } from "@angular/core";
import { PolicyService } from "./policy.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "angular-inmemory-api";
  policies: any[] = [];
  constructor(private policyService: PolicyService) {}

  ngOnInit() {
    console.log("---");
    this.policyService.getPolicies().subscribe((data: any[]) => {
      console.log(data);
      this.policies = data;
    });
  }
}
