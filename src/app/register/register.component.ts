import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { EmailService } from '../services/email.service';
import { User } from '../models/user';
import { Email } from '../models/email';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  email: Email = {
    "recipient": "",
    "msgBody": "",
    "subject": ""
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  register() {
    var new_user = {
      "id": 1,
      "username": this.registerForm.value.username,
      "password": this.registerForm.value.password,
      "email": this.registerForm.value.email
    }

    this.email.recipient = new_user.email;
    this.email.msgBody = "Thanks " + new_user.username + " for signing up for TravelLog. We hope you enjoy your journey here.";
    this.email.subject = "Welcome to TravelLog!";

    this.userService
      .create(new_user)
      .subscribe((user) => {
        if (user != null) {
          localStorage.setItem('currentUser', user.id.toString());
          alert('Registered successfully');
          this.emailService.sendEmail(this.email).subscribe();
          this.router.navigate(['travels']);
        } else {
          alert('Registration failed');
        }
      });
  }
}
