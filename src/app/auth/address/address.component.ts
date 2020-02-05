import { Component, OnInit } from '@angular/core';
import { Address } from '../address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  location: Address;
  constructor() { }

  ngOnInit() {
  }

}
