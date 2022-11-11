import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightlistComponent } from './flightlist/flightlist.component';
import { TravellistComponent } from './travellist/travellist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
    { path: 'travel', component: TravellistComponent },
    { path: 'flight', component: FlightlistComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'maps', component: MapsComponent },
    { path: '**', component: TravellistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
