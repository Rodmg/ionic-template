import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { map } from "rxjs/operators";
import { BaseModel } from "../models";
import { Observable } from "rxjs";

export interface ServiceOptions {
  include?: any[];
  where?: any;
  limit?: number;
  offset?: number;
  order?: any;
  search?: string;
}

export interface GetAllResponse<T extends BaseModel> {
  count?: number;
  data: T[];
}

export abstract class BaseService<T extends BaseModel> {
  protected abstract path: string;

  constructor(protected model: new (obj?: any) => T, protected http: HttpClient) {}

  // Returns { count: number; data: T[]; } when detailed is true
  getAll(options?: ServiceOptions, detailed?: boolean): Observable<GetAllResponse<T>> {
    let params = new HttpParams();
    for (const key in options) {
      if (options.hasOwnProperty(key) && options[key] !== undefined) {
        if (key === "search") {
          params = params.append(key, options[key]);
        } else {
          params = params.append(key, JSON.stringify(options[key]));
        }
      }
    }
    const opts = options
      ? {
          params
        }
      : {};
    if (detailed) {
      return this.http
        .get<T[]>(`${environment.apiUrl}/${this.path}`, { ...opts, observe: "response" })
        .pipe(
          map(res => ({
            count: parseInt(res.headers.get("Content-Count"), 10),
            data: res.body.map(i => new this.model(i))
          }))
        );
    }
    return this.http.get<T[]>(`${environment.apiUrl}/${this.path}`, opts).pipe(
      map(res => ({
        data: res.map(i => new this.model(i))
      }))
    );
  }

  get(id: number, options?: ServiceOptions): Observable<T> {
    let params = new HttpParams();
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        params = params.append(key, JSON.stringify(options[key]));
      }
    }
    const opts = options
      ? {
          params
        }
      : {};
    return this.http
      .get<T>(`${environment.apiUrl}/${this.path}/${id}`, opts)
      .pipe(map(res => new this.model(res)));
  }

  update(id: number, data: T): Observable<T> {
    return this.http
      .put<T>(`${environment.apiUrl}/${this.path}/${id}`, data)
      .pipe(map(res => new this.model(res)));
  }

  create(data: T): Observable<T> {
    return this.http
      .post<T>(`${environment.apiUrl}/${this.path}`, data)
      .pipe(map(res => new this.model(res)));
  }

  delete(id: number) {
    return this.http.delete<T>(`${environment.apiUrl}/${this.path}/${id}`);
  }
}
