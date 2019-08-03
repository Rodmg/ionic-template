import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "./../../environments/environment";

import { LoginUser } from "./../models";

const CURRENT_USER_KEY = `currentUser`;

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginUser>;
  public currentUser: Observable<LoginUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(
      JSON.parse(localStorage.getItem(CURRENT_USER_KEY))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<LoginUser>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
      map((user: LoginUser) => {
        // login successful if there's a jwt token in the response
        if (user && user.token && user.user.id) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  change(oldPass: string, newPass: string) {
    return this.http.post<LoginUser>(`${environment.apiUrl}/auth/change`, {
      email: this.currentUserValue.user.email,
      oldPass,
      newPass
    });
  }
}
