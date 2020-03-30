import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/event';
import { Rsvp } from 'src/app/shared/models/rsvp';
import { EventService } from 'src/app/shared/services/event.service';
import { RsvpService } from 'src/app/shared/services/rsvp.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  attending: boolean;
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
    private eventService: EventService,
    private router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.event = this.eventService.getEvent(this.eventId);
      if (!this.event.live) {
        this.router.navigateByUrl('events');
      }
      this.when = this.eventService.getEventDate(this.eventId);
      this.rsvpService.getRsvpObservable(this.eventId).subscribe(rsvp => {
        this.numberOfPeople = rsvp.numberOfPeople;
        this.attending = rsvp.attending;
        this.rsvp = new Rsvp(this.eventId, this.event.title, this.attending, this.numberOfPeople);
        this.rsvp.id = rsvp.id;
        this.attending$ = this.rsvpService.isCurrentUserAttendingEvent(rsvp.id);
        this.loaded = true;
      });
    });
  }

  showMessage(message: string, duration = 5000) {
    this.snackBar.open(message, 'X', {
      duration
    });
  }

  payHere() {
    alert('Still need to set up');
  }

  signUp(): void {
    const rsvp = new Rsvp(this.eventId, this.event.title, this.rsvp.attending, this.rsvp.numberOfPeople);
    const dialogAttending = this.dialog.open(DialogAttending, {
      width: '300px',
      data: { rsvp }
    });

    dialogAttending.afterClosed().subscribe(newRsvp => {
      if (newRsvp) {
        newRsvp.id = this.rsvp.id;
        if (this.rsvp !== newRsvp) {
          this.rsvpService.updateRsvp(newRsvp).then(updatedRsvp => {
            if (updatedRsvp) {
              this.rsvp = updatedRsvp;
              if (this.rsvp.attending) {
                this.showMessage(`Signup Success`);
              } else {
                this.showMessage(`We now no longer have you attending this event`);
              }
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

  constructor(public dialogAttending: MatDialogRef<DialogAttending>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.data.rsvp.attending = false;
    this.dialogAttending.close(this.data.rsvp);
  }

  onYesClick(): void {
    this.data.rsvp.attending = true;
    this.dialogAttending.close(this.data.rsvp);
  }
}
