import { CompanyState } from "../store.company";
import {
  CompanyActionTypes,
  CompanysActions,
} from "../actions/company.actions";

export function companyInitialState(): CompanyState {
  return {
    currentCompany: null,
    message: "",
    empresas: [],
  };
}

export function companyReducer(
  state: CompanyState = companyInitialState(),
  action: CompanysActions
): CompanyState {
  switch (action.type) {
    //Esta accion establece en el store de empresa la compañia actualmente logado
    case CompanyActionTypes.SET_CURRENT_COMPANY:
      return {
        ...state,
        currentCompany: action.payload,
      };
    case CompanyActionTypes.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        currentCompany: action.payload,
        message: "Empresa actualizada correctamente",
      };
    case CompanyActionTypes.UPDATE_COMPANY_ERROR:
      return {
        ...state,
        message: "Se ha producido une error: " + action.message,
      };

    case CompanyActionTypes.LOAD_COMPANIES_SUCCESS:
      return {
        ...state,
        empresas: action.payload,
      };

    default:
      return state;
  }
}
