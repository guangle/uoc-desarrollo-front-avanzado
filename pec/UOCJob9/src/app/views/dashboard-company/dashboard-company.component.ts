import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { Router } from "@angular/router";
import { Company } from '../../shared/models/company.model';

@Component({
  selector: 'app-dashboard-company',
  templateUrl: './dashboard-company.component.html',
  styleUrls: ['./dashboard-company.component.scss']
})
export class DashboardCompanyComponent implements OnInit {

  public company: Company;

  constructor( private companyService: CompanyService, private router: Router ) {
    console.log('Dashboard de empresa..');
    this.company = this.companyService.company;
    console.log(this.company);
   }

  ngOnInit(): void {
  }

  logout() {
    this.companyService.clear();
    this.router.navigate(["/signin"]);
  }

}
