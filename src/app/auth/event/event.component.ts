import { Component, OnInit, Inject } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Address } from '../address';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rsvp } from '../rsvp';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  attending$: Observable<boolean>;

  eventId: string;

  rsvp: Rsvp;

  title: string;
  address: Address;
  pricePerPerson: number;
  signupOpenTill: Date;
  summary: string;
  when: Date;

  detailsLoaded = false;
  rsvpLoaded = false;

  signupOpen = true;

  constructor(private route: ActivatedRoute, private authService: AuthService, private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.getDetails();
      this.getRsvp();
    });
  }

  getRsvp() {
    this.authService.getRsvp(this.eventId).subscribe(rsvp => {
      this.rsvp = rsvp;
      this.attending$ = this.authService.isCurrentUserAttendingEvent(this.rsvp.id);
      this.rsvpLoaded = true;
    });
  }

  getDetails() {
    this.authService.getEvent(this.eventId).subscribe(evtDtl => {
      this.address = evtDtl.address;
      this.title = evtDtl.title;
      this.pricePerPerson = evtDtl.pricePerPerson;
      this.signupOpenTill = evtDtl.signupOpenTill.toDate();
      this.summary = evtDtl.summary;
      this.when = evtDtl.when.toDate();
      this.detailsLoaded = true;
    });
  }

  showMessage(message: string, duration = 5000) {
    this.snackBar.open(message, 'X', {
      duration
    });
  }

  removeFromEvent(): void {
    this.rsvp.attending = false;
    this.authService.updateRsvp(this.rsvp).then(success => {
      if (success) {
        this.showMessage(`We now no longer have you attending the ${this.title} event`);
      } else {
        this.showMessage('Error with updating your event, please try again.');
      }
    }, err => {
      console.log(err);
      this.showMessage('Error with updating your event, please try again.');
    });
  }
  signUp(): void {
    const rsvp = this.rsvp;
    const dialogAttending = this.dialog.open(DialogAttending, {
      width: '250px',
      data: { rsvp }
    });

    dialogAttending.afterClosed().subscribe(result => {
      if (result) {
        this.rsvp = result.rsvp;
        this.rsvp.attending = true;
        this.authService.updateRsvp(this.rsvp).then(success => {
          if (success) {
            this.showMessage(`We now have you attending the ${this.title} event`);
          } else {
            this.showMessage('Error with updating your event, please try again.');
          }
        }, err => {
          console.log(err);
          this.showMessage('Error with updating your event, please try again.');
        });
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
    @Inject(MAT_DIALOG_DATA) public data: Rsvp) { }

  onNoClick(): void {
    this.dialogAttending.close();
  }

}
