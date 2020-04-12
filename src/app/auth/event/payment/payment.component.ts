import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/shared/models/event';
import { Rsvp } from 'src/app/shared/models/rsvp';
import { RsvpService } from 'src/app/shared/services/rsvp.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() rsvp: Rsvp;
  @Input() evt: Event;
  @Output() showMessage: EventEmitter<string> = new EventEmitter();
  constructor(public dialog: MatDialog, private rsvpService: RsvpService) { }

  ngOnInit(): void {
  }

  payHere() {
    const paymentDialog = this.dialog.open(PaymentDialog, {
      width: '295px',
      data: {
        event: this.evt,
        rsvp: this.rsvp
      }
    });
    paymentDialog.afterClosed().subscribe(payed => {
      if (this.rsvp.payed !== payed) {
        const newRsvp = new Rsvp(this.rsvp.eventId, this.rsvp.attending, this.rsvp.numberOfPeople, payed);
        newRsvp.id = this.rsvp.id;
        this.rsvpService.updateRsvp(newRsvp).then(r => {
          console.log(r);
          this.showMessage.emit('Rsvp Updated');
        }).catch(err => {
          console.error(err);
          this.showMessage.emit('Error Updatting Rsvp');
        });
      }
    });
  }

}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'payment-dialog',
  templateUrl: 'payment-dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class PaymentDialog {

  constructor(public paymentDialog: MatDialogRef<PaymentDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.paymentDialog.close(false);
  }

  onYesClick(): void {
    this.paymentDialog.close(true);
  }
}
