import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { MaterialModule } from '../shared/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PhoneComponent } from './profile/phone/phone.component';
import { AddressComponent } from './profile/address/address.component';
import { NameComponent } from './profile/name/name.component';
import { EventComponent } from './event/event.component';
import { RsvpsComponent } from './profile/rsvps/rsvps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PhoneComponent,
    AddressComponent,
    NameComponent,
    EventComponent,
    RsvpsComponent
  ]
})
export class AuthModule { }
