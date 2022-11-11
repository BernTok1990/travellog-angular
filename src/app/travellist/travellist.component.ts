import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TravelService } from '../services/travel.service';
import { Travel } from '../models/travel';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TravelformComponent } from '../travelform/travelform.component';

@Component({
  selector: 'app-travellist',
  templateUrl: './travellist.component.html',
  styleUrls: ['./travellist.component.scss'],
})
export class TravellistComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id', 
    'name', 
    'itinerary', 
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private travelService: TravelService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    this.getUserTravels();
  }

  checkLogin() {
    var loggedIn = localStorage.getItem('currentUser');
    if (!loggedIn) {
      this.router.navigate(['landing']);
    }
  }

  getUserTravels() {
    this.travelService
      .getUserTravels(Number(localStorage.getItem('currentUser')))
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
        },
        // error: (err) => {
        //   alert(err.message);
        // },
      });
  }

  editTravel(row: any) {
    localStorage.setItem('travelformStatus', 'edit');
    this.dialog
      .open(TravelformComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe(() => {
        this.getUserTravels();
      });
  }

  deleteTravel(id: number) {
    this.travelService.delete(Number(id)).subscribe({
      next: (res) => {
        this.getUserTravels();
      },
      // error: (err) => {
      //   alert(err.message);
      // },
    });
  }

  loadFlights(id: number) {
    localStorage.setItem('currentTravel', id.toString());
    this.router.navigate(['flight']);
  }
}
