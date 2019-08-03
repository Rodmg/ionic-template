import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";

// UILoadingService
/*
  2 use cases:
    1. present a full screen blocking loader: use present() and dismiss()
    2. manage local loading state for embedded spinners: use start() and end(),
      use loading variable for your logic.
*/
@Injectable({
  providedIn: "root"
})
export class UiLoadingService {
  private loadingElement: HTMLIonLoadingElement = null;
  private loadingSubject: BehaviorSubject<boolean>;
  public loading: Observable<boolean>;

  constructor(public loadingController: LoadingController) {
    this.loadingSubject = new BehaviorSubject(false);
    this.loading = this.loadingSubject.asObservable();
  }

  // Full screen loader
  async present() {
    this.start();
    if (this.loadingElement != null) {
      return;
    }
    this.loadingElement = await this.loadingController.create({ message: "Cargando..." });
    return await this.loadingElement.present();
  }

  async dismiss() {
    this.end();
    if (this.loadingElement != null) {
      await this.loadingElement.dismiss();
      this.loadingElement = null;
    }
  }

  // Local loading state
  start() {
    this.loadingSubject.next(true);
  }

  end() {
    this.loadingSubject.next(false);
  }
}
