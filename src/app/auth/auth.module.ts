import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { MaterialModule } from '../shared/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { DialogAttending, EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { AddressComponent } from './profile/address/address.component';
import { NameComponent } from './profile/name/name.component';
import { PhoneComponent } from './profile/phone/phone.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RsvpsComponent } from './rsvps/rsvps.component';
import { BranchComponent } from './profile/branch/branch.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

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
    FileUploadComponent
  ],
  entryComponents: [
    DialogAttending
  ]
})
export class AuthModule { }
