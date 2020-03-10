import { Province, Municipe } from './user.model';

export interface Company {
  password: string; // Only for mock
  id: number;
  username: string;

  nombre_comercial: string;
  razon_social : string;
  cif : string;
  direccion : string;
  provincia : Province;
  municipio : Municipe;
  url : string;

  contacto_nombre: string;
  contacto_telefono : number;
  contacto_mail : string


}