import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { AlertInput } from "@ionic/core";

@Injectable({
  providedIn: "root"
})
export class UiAlertService {
  constructor(private alertController: AlertController, private toastController: ToastController) {}

  async present(title: string, message: string, subtitle: string = "") {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subtitle,
      message,
      buttons: ["Aceptar"]
    });

    await alert.present();
  }

  confirm(title: string, message: string, subtitle: string = ""): Promise<boolean> {
    return new Promise(async (resolve, _) => {
      const alert = await this.alertController.create({
        header: title,
        subHeader: subtitle,
        message,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              resolve(false);
            }
          },
          {
            text: "Si",
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }

  async notify(
    message: string,
    color:
      | "primary"
      | "secondary"
      | "tertiary"
      | "success"
      | "warning"
      | "danger"
      | "light"
      | "medium"
      | "dark" = "dark"
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: "bottom",
      showCloseButton: true,
      closeButtonText: "Cerrar",
      color
    });
    toast.present();
  }

  prompt(
    title: string,
    placeholder: string = "",
    defaultValue: string | number = null,
    type:
      | "number"
      | "text"
      | "url"
      | "date"
      | "email"
      | "password"
      | "search"
      | "tel"
      | "time"
      | "checkbox"
      | "radio" = "text"
  ) {
    return new Promise(async (resolve, _) => {
      const alert = await this.alertController.create({
        header: title,
        inputs: [
          {
            name: "value",
            value: defaultValue,
            type,
            placeholder
          }
        ],
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              resolve(null);
            }
          },
          {
            text: "Aceptar",
            handler: res => {
              resolve(res.value);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  promptAdvanced(title: string, inputs: AlertInput[], message: string = "", subtitle: string = "") {
    return new Promise(async (resolve, _) => {
      const alert = await this.alertController.create({
        header: title,
        subHeader: subtitle,
        message,
        inputs,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              resolve(null);
            }
          },
          {
            text: "Aceptar",
            handler: res => {
              resolve(res);
            }
          }
        ]
      });

      await alert.present();
    });
  }
}
