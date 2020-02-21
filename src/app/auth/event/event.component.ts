import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth.service';
import { ProfileEvent } from '../profile-event';
import { EventDetail } from '../event-detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventId: string;
  attending = false;
  profileEventLoaded = false;
  profileEvent: ProfileEvent;

  eventDetailLoaded = false;
  eventDetail: EventDetail;
  loaded = false;
  signupOpen = true;
  constructor(private route: ActivatedRoute, private authService: AuthService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.authService.getEventDetail(this.eventId).subscribe(evtDtl => {
        this.eventDetail = evtDtl;

        const dateOfEvent = this.eventDetail.when.toDate();
        console.log("dateOfEvent");
        console.log(dateOfEvent);

        const dateOfSignUpOpentill = new Date();
        if (typeof (this.eventDetail.signupOpenTill) === 'undefined') {
          dateOfSignUpOpentill.setDate(dateOfEvent.getDate() - 7);
        } else {
          this.eventDetail.signupOpenTill.toDate();
        }
        console.log("dateOfSignUpOpentill");
        console.log(dateOfSignUpOpentill);

        const now = new Date(Date.now());
        console.log("now");
        console.log(now);

        this.signupOpen = dateOfSignUpOpentill < now;

        this.eventDetailLoaded = true;
        this.checkIfLoaded();
      });
      this.authService.getProfileEventDocument(this.eventId).subscribe(prflEvt => {
        this.profileEvent = prflEvt;
        this.attending = this.profileEvent.attending;
        this.profileEventLoaded = true;
        this.checkIfLoaded();
      });
    });
  }

  checkIfLoaded() {
    this.loaded = this.eventDetailLoaded && this.profileEventLoaded;
  }

  updateCheckbox(evt: MatSlideToggleChange) {
    this.profileEvent.attending = evt.checked;
    this.authService.updateEvent(this.profileEvent).subscribe(() => {
      const message = this.profileEvent.attending ?
        `We now have you attending the ${this.profileEvent.title}` :
        `Sorry to see you will not be attending`
      this.showMessage(message);
    }, err => {
      console.log(err);
      this.showMessage('Error with updating your event, please try again.');
    });
  }

  showMessage(message: string, duration = 2000) {
    this.snackBar.open(message, 'X', {
      duration: duration
    });
  }
}
