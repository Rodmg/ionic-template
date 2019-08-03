import { Injectable } from "@angular/core";
import { UiAlertService } from "./ui-alert.service";
import { ModalController } from "@ionic/angular";
import { ErrorPage } from "../pages/error/error.page";

@Injectable({
  providedIn: "root"
})
export class UiErrorService {
  private errorActive = false;

  constructor(private alert: UiAlertService, private modalController: ModalController) {}

  // Cancellable retry prompt
  async promptRetry(callback) {
    if (this.errorActive) {
      return;
    }
    this.errorActive = true;
    const result = await this.alert.confirm("Hubo un problema...", "¿Volver a intentar?");
    this.errorActive = false;
    if (result && callback) {
      callback();
    }
  }

  // Non cancellable retry modal
  async modalRetry(callback) {
    if (this.errorActive) {
      return;
    }
    this.errorActive = true;
    const modal = await this.modalController.create({
      component: ErrorPage,
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.errorActive = false;
    if (callback) {
      callback();
    }
  }
}
