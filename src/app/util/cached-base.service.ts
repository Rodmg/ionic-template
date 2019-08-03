import { BaseService, ServiceOptions, GetAllResponse } from "./base.service";
import { BaseModel } from "../models";
import { Observable, ReplaySubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { StoreService } from "../services/store.service";
import hashCode from "./hash-code";

export abstract class CachedBaseService<T extends BaseModel> extends BaseService<T> {
  constructor(
    protected model: new (obj?: any) => T,
    protected http: HttpClient,
    public store: StoreService
  ) {
    super(model, http);
  }

  // Returns { count: number; data: T[]; } when detailed is true
  getAll(options?: ServiceOptions, detailed?: boolean): Observable<GetAllResponse<T>> {
    const subject = new ReplaySubject<GetAllResponse<T>>(1);

    const hash = hashCode(`/${this.path}?${JSON.stringify(options)}?${!!detailed}`).toString();
    const cached = this.store.select([this.path, hash]);
    console.log(cached);
    if (cached != null) {
      subject.next(cached);
    }
    super.getAll(options, detailed).subscribe(
      res => {
        subject.next(res);
        this.store.put([this.path, hash], res);
      },
      err => subject.error(err),
      () => subject.complete()
    );

    return subject.asObservable();
  }

  get(id: number, options?: ServiceOptions): Observable<T> {
    const subject = new ReplaySubject<T>(1);

    const hash = hashCode(`/${this.path}/${id}?${JSON.stringify(options)}`).toString();
    const cached = this.store.select([this.path, hash]);
    if (cached != null) {
      subject.next(cached);
    }
    super.get(id, options).subscribe(
      res => {
        subject.next(res);
        this.store.put([this.path, hash], res);
      },
      err => subject.error(err),
      () => subject.complete()
    );

    return subject.asObservable();
  }
}
