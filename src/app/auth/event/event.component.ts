import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Address } from '../address';
import { Event } from '../event';
import { Rsvp } from '../rsvp';
import { EventService } from '../services/event.service';
import { RsvpService } from '../services/rsvp.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  attending$: Observable<boolean>;

  eventId: string;

  rsvp: Rsvp;
  event: Event;

  loaded = false;

  when: Date;
  numberOfPeople: number;

  signupOpen = true;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private rsvpService: RsvpService,
    private eventService: EventService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.event = this.eventService.getEvent(this.eventId);
      this.when = this.eventService.getEventDate(this.eventId);
      this.rsvp = this.rsvpService.getRsvp(this.eventId);
      if (this.rsvp) {
        this.numberOfPeople = this.rsvp.numberOfPeople;
        this.attending$ = this.rsvpService.isCurrentUserAttendingEvent(this.rsvp.id);
        this.loaded = true;
      }
    });
  }

  showMessage(message: string, duration = 5000) {
    this.snackBar.open(message, 'X', {
      duration
    });
  }

  signUp(): void {
    const rsvp = new Rsvp(this.eventId, this.event.title, this.rsvp.attending, this.rsvp.numberOfPeople);
    const dialogAttending = this.dialog.open(DialogAttending, {
      width: '250px',
      data: { rsvp }
    });

    dialogAttending.afterClosed().subscribe(newRsvp => {
      if (newRsvp) {
        newRsvp.id = this.rsvp.id;
        if (this.rsvp !== newRsvp) {
          this.rsvpService.updateRsvp(newRsvp).then(success => {
            if (success) {
              this.rsvp = this.rsvpService.getRsvp(this.event.id);
              // if (this.rsvp.attending) {
              //   this.showMessage(`We now have you attending the ${this.rsvp.title} event with ${this.rsvp.numberOfPeople} people total`);
              // } else {
              //   this.showMessage(`We now no longer have you attending the ${this.rsvp.title} event`);
              // }
            } else {
              this.showMessage('Error with updating your event, please try again.');
            }
          }, err => {
            console.log(err);
            this.showMessage('Error with updating your event, please try again.');
          });
        }
      }
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-attending',
  templateUrl: 'dialog-attending.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogAttending {

  constructor(
    public dialogAttending: MatDialogRef<DialogAttending>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.data.rsvp.attending = false;
    this.dialogAttending.close(this.data.rsvp);
  }

  onYesClick(): void {
    this.data.rsvp.attending = true;
    this.dialogAttending.close(this.data.rsvp);
  }

}
