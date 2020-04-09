import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { MaterialModule } from '../shared/modules/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { EventHeaderComponent } from './event/event-header/event-header.component';
import { DialogAttending, EventComponent } from './event/event.component';
import { PaymentComponent, PaymentDialog } from './event/payment/payment.component';
import { LoginComponent } from './login/login.component';
import { AddressComponent } from './profile/address/address.component';
import { BranchComponent } from './profile/branch/branch.component';
import { NameComponent } from './profile/name/name.component';
import { PhoneComponent } from './profile/phone/phone.component';
import { AddMember, ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RsvpComponent } from './rsvps/rsvp/rsvp.component';
import { RsvpsComponent } from './rsvps/rsvps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PhoneComponent,
    AddressComponent,
    NameComponent,
    EventComponent,
    RsvpsComponent,
    DialogAttending,
    BranchComponent,
    RsvpComponent,
    PaymentComponent,
    AddMember,
    EventHeaderComponent,
    PaymentDialog
  ],
  entryComponents: [
    DialogAttending,
    AddMember,
    PaymentDialog
  ]
})
export class AuthModule { }
