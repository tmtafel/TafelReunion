import { Component, OnInit, Input } from '@angular/core';
import { Rsvp } from 'src/app/shared/models/rsvp';
import { Event } from 'src/app/shared/models/event';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() rsvp: Rsvp;
  @Input() evt: Event;
  constructor() { }

  ngOnInit(): void {
  }

  payHere() {
    alert('Still need to set up');
  }

}
