import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { DataService } from "./data.service";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InMemoryWebApiModule.forRoot(DataService)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
