import { Injectable } from "@angular/core";
import * as localForage from "localforage";
import { path } from "rambda";
import assocPath from "./../util/assoc-path";

const PERSIST_INTERVAL = 10000;

@Injectable({
  providedIn: "root"
})
export class StoreService {
  private persistanceStore: LocalForage;
  private state: any = {};
  private shouldPersist = false;

  constructor() {
    localForage.config({
      name: "myApp"
    });
    this.persistanceStore = localForage.createInstance({
      name: "globalStore"
    });
  }

  public async init(): Promise<void> {
    // Get store from persistance
    await this.retrievePersistedStore();
    // Setup persist periodic task
    setInterval(() => {
      if (this.shouldPersist) {
        this.persistStore();
      }
    }, PERSIST_INTERVAL);
  }

  private async persistStore() {
    try {
      await this.persistanceStore.setItem("state", this.state);
    } catch (err) {
      console.error("Error persisting store", err);
    }
  }

  private async retrievePersistedStore() {
    try {
      this.state = await this.persistanceStore.getItem("state");
      console.log(this.state, typeof this.state);
    } catch {
      this.state = {};
    }
  }

  requestPersist() {
    this.shouldPersist = true;
  }

  select(pathToSearch: (string | number)[]): any {
    return path(pathToSearch, this.state);
  }

  put(pathToSearch: (string | number)[], value: any) {
    this.state = assocPath(pathToSearch, value, this.state);
    this.requestPersist();
  }
}
