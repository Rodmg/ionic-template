import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ErrorPage } from "./error.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ErrorPage]
})
export class ErrorPageModule {}
