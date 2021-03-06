import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from "../../shared/auth.service";
import { User } from "../../shared/user";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

    submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };

    this.auth.login(user)
      .subscribe(res => {
        this.form.reset();
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
      },
      () => {
        this.submitted = false;
      }
    );
  }

}
