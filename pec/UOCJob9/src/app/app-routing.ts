import { Routes } from "@angular/router";

export const rootRouterConfig: Routes = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
  {
    path: "signin",
    loadChildren: () =>
      import("./views/signin/signin.module").then((m) => m.SigninModule),
    data: { title: "Signin" },
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./views/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordModule
      ),
    data: { title: "Forgot Password" },
  },
  {
    path: "notes",
    loadChildren: () =>
      import("./views/notes/notes.module").then((m) => m.NotesModule),
    data: { title: "Notas de la implementación" },
  },
  //refactorizamos las rutas tras la inclusión del template.
  //Ahora todas las rutas una vez se autentica el usuario
  //en la aplicación estaran bajo /uojobs/..
  {
    path: "uojobs",
    loadChildren: () =>
      import("./views/template/template.module").then((m) => m.TemplateModule),
    data: { title: "Notas de la implementación" },
  },
  //Las rutas propias de la aplicación (una vez logado el usuario-empresa) pasan al template-routes
  {
    path: "**",
    redirectTo: "sessions/404",
  },
];
