import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from 'src/app/auth/address';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-event-address',
  templateUrl: './add-event-address.component.html',
  styleUrls: ['./add-event-address.component.scss']
})
export class AddEventAddressComponent implements OnInit {
  @Output() addressChange: EventEmitter<Address> = new EventEmitter();
  address: Address;
  streetFormCtrl: FormControl;
  cityFormCtrl: FormControl;
  stateFormCtrl: FormControl;
  zipFormCtrl: FormControl;
  countryFormCtrl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.streetFormCtrl = new FormControl('');
    this.streetFormCtrl.valueChanges.subscribe(newStreet => {
      this.address.street = newStreet;
      this.addressChange.emit(this.address);
    });

    this.cityFormCtrl = new FormControl('');
    this.cityFormCtrl.valueChanges.subscribe(newCity => {
      this.address.city = newCity;
      this.addressChange.emit(this.address);
    });

    this.stateFormCtrl = new FormControl('');
    this.stateFormCtrl.valueChanges.subscribe(newState => {
      this.address.state = newState;
      this.addressChange.emit(this.address);
    });

    this.zipFormCtrl = new FormControl('');
    this.zipFormCtrl.valueChanges.subscribe(newZip => {
      this.address.zip = newZip;
      this.addressChange.emit(this.address);
    });

    this.countryFormCtrl = new FormControl('');
    this.countryFormCtrl.valueChanges.subscribe(newCountry => {
      this.address.country = newCountry;
      this.addressChange.emit(this.address);
    });
  }

}
