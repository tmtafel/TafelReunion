import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-event-price',
  templateUrl: './add-event-price.component.html',
  styleUrls: ['./add-event-price.component.scss']
})
export class AddEventPriceComponent implements OnInit {

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
