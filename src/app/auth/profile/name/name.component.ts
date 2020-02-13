import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  @Input() firstName: string;
  @Output() firstNameChange: EventEmitter<string> = new EventEmitter();
  firstNameFormControl: FormControl;

  @Input() lastName: string;
  @Output() lastNameChange: EventEmitter<string> = new EventEmitter();
  lastNameFormControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.firstNameFormControl = new FormControl(this.firstName);
    this.firstNameFormControl.valueChanges.subscribe(newFirstName => {
      this.firstName = newFirstName;
      this.firstNameChange.emit(newFirstName);
    });

    this.lastNameFormControl = new FormControl(this.lastName);
    this.lastNameFormControl.valueChanges.subscribe(newLastName => {
      this.lastName = newLastName;
      this.lastNameChange.emit(newLastName);
    });
  }

}
