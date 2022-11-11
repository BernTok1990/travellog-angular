import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TravelformComponent } from './travelform/travelform.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Travel Log';

  constructor(private router: Router, private dialog: MatDialog) {}

  homePage() {
    if (this.loggedIn) {
      this.router.navigate(['travel']);
    } else {
      this.router.navigate(['landing']);
    }
  }

  openMaps() {
    this.router.navigate(['maps']);
  }

  get loggedIn(): boolean {
    return localStorage.getItem('currentUser') != null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['landing']);
  }

  openAddTravel() {
    localStorage.setItem("travelformStatus", "add");
    this.dialog.open(TravelformComponent, {
      data: {},
    });
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      data: {},
    });
  }

  openRegister() {
    this.dialog.open(RegisterComponent, {
      data: {},
    });
  }
}
