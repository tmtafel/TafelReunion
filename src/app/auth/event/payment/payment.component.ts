import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input() numberOfPeople: number;
  @Input() pricePerPerson: number;
  constructor() { }

  ngOnInit(): void {
  }

  payHere() {
    alert('Still need to set up');
  }

}
