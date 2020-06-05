import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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
    );
  }
}
