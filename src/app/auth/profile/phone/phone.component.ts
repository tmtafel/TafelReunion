import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit, DoCheck {
  @Input() phone: string;
  @Output() phoneChange: EventEmitter<string> = new EventEmitter();
  phoneFormControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.phoneFormControl = new FormControl(this.phone);
    this.phoneFormControl.valueChanges.subscribe(newPhone => {
      this.phone = newPhone;
    });
  }

  ngDoCheck() {
    this.phoneChange.next(this.phone);
  }

}
