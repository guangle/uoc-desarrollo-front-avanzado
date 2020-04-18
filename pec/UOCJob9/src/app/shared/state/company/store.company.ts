import { Company } from "../../models/company.model";

export interface CompanyState {
  currentCompany: Company;
  message: string;
}
