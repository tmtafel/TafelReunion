import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/shared/models/event';
import { Rsvp } from 'src/app/shared/models/rsvp';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() rsvp: Rsvp;
  @Input() evt: Event;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  payHere() {
    const paymentDialog = this.dialog.open(PaymentDialog, {
      width: '295px',
      data: {
        pricePerPerson: this.evt.pricePerPerson,
        numberOfPeople: this.rsvp.numberOfPeople
      }
    });
    paymentDialog.afterClosed().subscribe(data => {
      console.log(data);
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
    this.paymentDialog.close(this.data);
  }

  onYesClick(): void {
    this.paymentDialog.close(this.data);
  }
}
