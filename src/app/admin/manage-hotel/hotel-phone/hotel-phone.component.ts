import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel-phone',
  templateUrl: './hotel-phone.component.html',
  styleUrls: ['./hotel-phone.component.scss']
})

export class HotelPhoneComponent implements OnInit {
  @Input() phone: string;
  @Output() phoneChange: EventEmitter<string> = new EventEmitter();
  phoneFormControl: FormControl;
  constructor() { }

  ngOnInit() {
    this.phoneFormControl = new FormControl(this.phone);
    this.phoneFormControl.valueChanges.subscribe(newphone => {
      this.phone = newphone;
      this.phoneChange.emit(newphone);
    });
  }

}
