import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  // nameFormGroup: FormGroup;

  constructor() {
    // this.nameFormGroup = this.formBuilder.group({
    //   firstNameFormCtrl: ['', [Validators.required]],
    //   lastNameFormCtrl: ['', [Validators.required]]
    // });
  }

  ngOnInit() {
    // this.nameFormGroup.controls.firstNameFormCtrl.setValue(this.firstName);
    // this.nameFormGroup.controls.lastNameFormCtrl.setValue(this.lastName);

  }

}
