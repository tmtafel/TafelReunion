import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../../address';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() address: Address;
  @Output() addressChange: EventEmitter<Address> = new EventEmitter();
  streetFormCtrl: FormControl;
  cityFormCtrl: FormControl;
  stateFormCtrl: FormControl;
  zipFormCtrl: FormControl;
  countryFormCtrl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.streetFormCtrl = new FormControl(this.address.street);
    this.streetFormCtrl.valueChanges.subscribe(newStreet => {
      this.address.street = newStreet;
      this.addressChange.emit(this.address);
    });

    this.cityFormCtrl = new FormControl(this.address.city);
    this.cityFormCtrl.valueChanges.subscribe(newCity => {
      this.address.city = newCity;
      this.addressChange.emit(this.address);
    });

    this.stateFormCtrl = new FormControl(this.address.state);
    this.stateFormCtrl.valueChanges.subscribe(newState => {
      this.address.state = newState;
      this.addressChange.emit(this.address);
    });

    this.zipFormCtrl = new FormControl(this.address.zip);
    this.zipFormCtrl.valueChanges.subscribe(newZip => {
      this.address.zip = newZip;
      this.addressChange.emit(this.address);
    });

    this.countryFormCtrl = new FormControl(this.address.country);
    this.countryFormCtrl.valueChanges.subscribe(newCountry => {
      this.address.country = newCountry;
      this.addressChange.emit(this.address);
    });
  }

}
