import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RsvpsComponent } from './rsvps/rsvps.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: RsvpsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events/:id',
    component: EventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload',
    component: FileUploadComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
