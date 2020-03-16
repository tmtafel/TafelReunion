import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-price',
  templateUrl: './event-price.component.html',
  styleUrls: ['./event-price.component.scss']
})
export class EventPriceComponent implements OnInit {

  @Input() price: string;
  @Output() priceChange: EventEmitter<string> = new EventEmitter();
  priceFormControl: FormControl;
  constructor() { }

  ngOnInit() {
    this.priceFormControl = new FormControl(this.price);
    this.priceFormControl.valueChanges.subscribe(newprice => {
      this.price = newprice;
      this.priceChange.emit(newprice);
    });
  }

}
