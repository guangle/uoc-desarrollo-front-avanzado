import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MessagesRoutingModule } from "./messages-routing.module";
import { MessagesComponent } from "./messages.component";

@NgModule({
  exports: [MessagesComponent],
  declarations: [MessagesComponent],
  imports: [CommonModule, MessagesRoutingModule],
})
export class MessagesModule {}
