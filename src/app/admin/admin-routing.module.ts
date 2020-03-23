import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageHotelComponent } from './manage-hotel/manage-hotel.component';
import { ManageHotelsComponent } from './manage-hotels/manage-hotels.component';
import { AddEventComponent } from './add-event/add-event.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'addevent',
        component: AddEventComponent
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
