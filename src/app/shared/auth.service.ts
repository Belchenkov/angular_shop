import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  login(user: User) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.API_KEY,
      user
    ).pipe(
      tap(this.setToken)
    );
  }

  private setToken(response) {
    if (response) {
      const expData = new Date().getTime() + (+response.expiresIn * 1000);

      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.removeItem('fb-token-exp');
      localStorage.removeItem('fb-token');
    }
  }

  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));

    if (new Date > expDate) {
      this.logout();

      return null;
    }

    return localStorage.getItem('fb-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}
