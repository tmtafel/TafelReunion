import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Address } from '../address';
import { AuthService } from '../auth.service';
import { EventDetail } from '../event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventId: string;
  attending = false;
  title: string;
  address: Address;
  pricePerPerson: number;
  signupOpenTill: Date;
  summary: string;
  when: Date;

  profileEventLoaded = false;
  eventDetailLoaded = false;
  loaded = false;

  signupOpen = true;
  constructor(private route: ActivatedRoute, private authService: AuthService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getDetails(id);
    });
  }

  getDetails(id: string) {
    this.authService.getEventDetail(id).subscribe(evtDtl => {
      this.address = evtDtl.address;
      this.title = evtDtl.title;
      this.pricePerPerson = evtDtl.pricePerPerson;
      this.signupOpenTill = evtDtl.signupOpenTill.toDate();
      this.summary = evtDtl.summary;
      this.when = evtDtl.when.toDate();
      this.eventDetailLoaded = true;
      this.checkIfLoaded();
    });
  }

  checkIfLoaded() {
    this.loaded = this.eventDetailLoaded && this.profileEventLoaded;
  }

  // updateCheckbox(evt: MatSlideToggleChange) {
  //   this.profileEvent.attending = evt.checked;
  //   this.authService.updateEvent(this.profileEvent).subscribe(() => {
  //     const message = this.profileEvent.attending ?
  //       `We now have you attending the ${this.profileEvent.title}` :
  //       `Sorry to see you will not be attending`
  //     this.showMessage(message);
  //   }, err => {
  //     console.log(err);
  //     this.showMessage('Error with updating your event, please try again.');
  //   });
  // }

  showMessage(message: string, duration = 2000) {
    this.snackBar.open(message, 'X', {
      duration
    });
  }
}
