import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ManageHotelsComponent } from './manage-hotels/manage-hotels.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageHotelsComponent
  ]
})
export class AdminModule { }
