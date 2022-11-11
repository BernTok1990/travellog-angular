import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.userService
      .loginUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((user) => {
        if (user != null) {
          localStorage.setItem('currentUser', user.id.toString());
          alert('Login successfully');
          this.router.navigate(['travels']);
        } else {
          alert('Login failed');
        }
      });
  }
}
