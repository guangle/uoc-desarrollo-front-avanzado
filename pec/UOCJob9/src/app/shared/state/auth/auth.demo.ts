/** Estado que define los datos relativos a la autenticación del usuario */

export interface AuthState {
  logged: boolean; //¿Hay alguien logado en la aplicación?
  last_login: Date; //Fecha del login
  name: string; //Nombre de usuario, para mostrar en el header
  token: string; //Token de autenticación, será inventado porque no nos autenticamos contra ningún back
  type: string; //user o company
  message: string;
}
