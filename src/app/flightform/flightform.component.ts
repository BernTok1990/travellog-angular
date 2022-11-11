import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-flightform',
  templateUrl: './flightform.component.html',
  styleUrls: ['./flightform.component.scss'],
})
export class FlightformComponent implements OnInit {
  flightForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.flightForm = this.formBuilder.group({
      date: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  addFlight() {
    var new_flight = {
      id: 1,
      date: this.flightForm.value.date,
      source: this.flightForm.value.source,
      destination: this.flightForm.value.destination,
      travelId: Number(localStorage.getItem('currentTravel')),
    };

    this.flightService.create(new_flight).subscribe((flight) => {
      if (flight != null) {
        alert('Flight created successfully');
        this.router.navigate(['flight']);
      } else {
        alert('Flight creation failed');
      }
    });
  }
}
