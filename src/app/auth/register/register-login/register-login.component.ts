import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Profile } from '../../profile';
import { ProfileService } from '../../services/profile.service';
import { RegisterService } from '../../services/register.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  profile: Profile;
  errorMessage: string;
  loginFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private registerService: RegisterService) { }


  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      emailFormCtrl: ['', [Validators.email, Validators.required]],
      passwordFormCtrl: ['', [Validators.minLength(6), Validators.required]],
      confirmPasswordFormCtrl: ['', [Validators.minLength(6), Validators.required]]
    }, {
        validator: this.MustMatch('passwordFormCtrl', 'confirmPasswordFormCtrl')
      });
  }
  createAccount() {
    const password = this.loginFormGroup.controls.passwordFormCtrl.value;
    const email = this.loginFormGroup.controls.emailFormCtrl.value;
    this.registerService.register(email, password).then(res => {
      if (res) {
        debugger;
        this.profile = this.profileService.getCurrentProfile();
      }
    }, err => {
      console.log(err);
      this.loginFormGroup.controls.emailFormCtrl.setErrors(err.code);
      this.errorMessage = err.message;
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {

        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
