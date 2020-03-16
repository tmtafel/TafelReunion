import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageHotelsComponent } from './manage-hotels/manage-hotels.component';
import { ManageHotelComponent } from './manage-hotel/manage-hotel.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: AdminDashboardComponent
          },
          {
            path: 'hotels',
            component: ManageHotelsComponent
          },
          {
            path: 'hotels/:id',
            component: ManageHotelComponent
          },
          {
            path: 'events',
            component: ManageEventsComponent
          },
          {
            path: 'events/:id',
            component: ManageEventComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
