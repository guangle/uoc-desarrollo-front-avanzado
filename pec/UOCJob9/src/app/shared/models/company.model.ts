import { Province, Municipe, UserAddress } from "./user.model";
import { Language, LanguageName } from "./language.model";

export interface Company {
  password: string; // Only for mock
  id: number;
  username: string;
  email: string;

  nombre_comercial: string;
  razon_social: string;
  cif: string;
  direccion: UserAddress;
  url: string;

  contacto: ContactoEmpresa;

  idioma_app: LanguageName;
}

export interface ContactoEmpresa {
  contacto_nombre: string;
  contacto_telefono: number;
  contacto_mail: string;
}
