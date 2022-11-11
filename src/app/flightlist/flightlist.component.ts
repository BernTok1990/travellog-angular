import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FlightformComponent } from '../flightform/flightform.component';

@Component({
  selector: 'app-flightlist',
  templateUrl: './flightlist.component.html',
  styleUrls: ['./flightlist.component.scss'],
})
export class FlightlistComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'source',
    'destination',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    this.getTravelFlights();
  }

  checkLogin() {
    var loggedIn = localStorage.getItem('currentUser');
    if (!loggedIn) {
      this.router.navigate(['landing']);
    }
  }

  addFlight() {
    this.dialog
      .open(FlightformComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe(() => {
        this.getTravelFlights();
      });
  }

  getTravelFlights() {
    this.flightService
      .getByTravelId(Number(localStorage.getItem('currentTravel')))
      .subscribe({
        next: (res) => {
          // Format Datetime 
          if (res != null) {
            res.map((row) => { 
              var date = new Date(row.date).toDateString();
              row.date = date.toString();
              return row;
            });
          }
          this.dataSource = new MatTableDataSource(res);
        },
        // error: (err) => {
        //     alert(err.message);
        // }
      });
  }

  deleteFlight(id: number) {
    this.flightService.delete(Number(id)).subscribe({
      next: (res) => {
        this.getTravelFlights();
      },
      // error: (err) => {
      //   alert(err.message);
      // },
    });
  }
}
