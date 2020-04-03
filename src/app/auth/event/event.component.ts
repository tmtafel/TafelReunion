import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  eventId: string;

  rsvp: Rsvp;
  event: Event;

  eventLoaded = false;
  rsvpLoaded = false;

  when: Date;

  signupOpen = true;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private rsvpService: RsvpService,
    private eventService: EventService,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.eventService.getEvent(this.eventId).subscribe(evt => {
        if (!evt.live) {
          this.router.navigateByUrl('events');
        }
        this.event = evt;
        this.when = evt.when.toDate();
        this.eventLoaded = true;
      });
      this.rsvpService.getRsvp(this.eventId).subscribe(r => {
        this.rsvp = r;
        this.rsvpLoaded = true;
      });
    });
  }

  showMessage(message: string, duration = 5000) {
    this.snackBar.open(message, 'X', {
      duration
    });
  }

  signUp(): void {
    const rsvp = new Rsvp(this.rsvp.eventId, this.rsvp.attending, this.rsvp.numberOfPeople);
    rsvp.id = this.rsvp.id;
    const dialogAttending = this.dialog.open(DialogAttending, {
      width: '295px',
      data: { rsvp }
    });

    dialogAttending.afterClosed().subscribe(newRsvp => {
      if (newRsvp) {
        if (this.rsvp !== newRsvp) {
          this.rsvpService.updateRsvp(newRsvp).then(updatedRsvp => {
            if (updatedRsvp) {
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
