import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  // steps = [
  //   { label: 'Confirm your name', content: 'Last name, First name.' },
  //   { label: 'Confirm your contact information', content: '123-456-7890' },
  //   { label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV' },
  //   { label: 'You are now done', content: 'Finished!' }
  // ];

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          firstNameFormCtrl: ['', Validators.required],
          lastNameFormCtrl: ['', Validators.required],
        }),
        this.formBuilder.group({
          emailFormCtrl: ['', [Validators.required, Validators.email]]
        }),
      ])
    });

    this.nameFormGroup = this.formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
    });

    this.emailFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.email]
    });
  }

  completeRegistration() {
    const firstName = this.nameFormGroup.value.firstNameCtrl;
    console.log(firstName);
  }

  // registerForm: FormGroup;
  // errorMessage = '';
  // successMessage = '';

  // constructor(public authService: AuthService, private fb: FormBuilder) {
  //   this.createForm();
  // }

  // createForm() {
  //   this.registerForm = this.fb.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // tryRegister() {
  //   this.authService.register(this.registerForm)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.errorMessage = '';
  //       this.successMessage = 'Your account has been created';
  //     }, err => {
  //       console.log(err);
  //       this.errorMessage = err.message;
  //       this.successMessage = '';
  //     });
  // }

}
