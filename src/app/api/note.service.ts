import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Note } from "../models";
import { CachedBaseService } from "../util/cached-base.service";
import { StoreService } from "../services/store.service";

@Injectable({ providedIn: "root" })
export class NoteService extends CachedBaseService<Note> {
  path = "note";
  constructor(protected http: HttpClient, public store: StoreService) {
    super(Note, http, store);
  }
}
