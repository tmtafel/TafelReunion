import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../address';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() address: Address;
  // addressFormGroup: FormGroup;

  constructor() {
    // this.addressFormGroup = this.formBuilder.group({
    //   streetFormCtrl: ['', [Validators.required]],
    //   cityFormCtrl: ['', [Validators.required]],
    //   stateFormCtrl: ['', [Validators.required]],
    //   postalCodeFormCtrl: ['', [Validators.required]],
    //   countryFormCtrl: ['', [Validators.required]]
    // });
  }

  ngOnInit() {
    // this.addressFormGroup.controls.streetFormCtrl.setValue(this.address.street);
    // this.addressFormGroup.controls.cityFormCtrl.setValue(this.address.city);
    // this.addressFormGroup.controls.stateFormCtrl.setValue(this.address.state);
    // this.addressFormGroup.controls.postalCodeFormCtrl.setValue(this.address.zip);
    // this.addressFormGroup.controls.countryFormCtrl.setValue(this.address.country);
  }

}
