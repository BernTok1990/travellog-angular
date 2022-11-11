import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TravelService } from '../services/travel.service';
import { Travel } from '../models/travel';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-travelform',
  templateUrl: './travelform.component.html',
  styleUrls: ['./travelform.component.scss'],
})
export class TravelformComponent implements OnInit {
  travelForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private travelService: TravelService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.travelForm = this.formBuilder.group({
      name: ['', Validators.required],
      itinerary: ['', Validators.required],
    });

    if (this.editData) {
      this.travelForm.controls['name'].setValue(this.editData.name);
      this.travelForm.controls['itinerary'].setValue(this.editData.itinerary);
    }
  }

  addTravel() {
    if (localStorage.getItem("travelformStatus") == "add") {
      console.log(localStorage.getItem('currentUser'));
      var new_travel = {
        id: 1,
        name: this.travelForm.value.name,
        itinerary: this.travelForm.value.itinerary,
        userId: Number(localStorage.getItem('currentUser')),
      };

      this.travelService.create(new_travel).subscribe((travel) => {
        if (travel != null) {
          alert('Travel created successfully');
        } else {
          alert('Travel creation failed');
        }
        this.router.navigate(['travels']);
      });
    } else {
      this.updateTravel();
    }
  }

  updateTravel() {
    var update_travel = {
      id: this.editData.id,
      name: this.travelForm.value.name,
      itinerary: this.travelForm.value.itinerary,
      userId: Number(localStorage.getItem('currentUser')),
    };

    this.travelService.update(update_travel).subscribe((travel) => {
      if (travel != null) {
        alert('Travel updated successfully');
      } else {
        // alert('Travel update failed');
      }
      this.router.navigate(['travels']);
    });
  }
}
