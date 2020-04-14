import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RsvpsComponent } from './rsvps/rsvps.component';

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
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard]
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
