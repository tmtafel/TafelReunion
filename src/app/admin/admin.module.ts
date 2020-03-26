import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { EventAddressComponent } from './manage-event/event-address/event-address.component';
import { EventImageComponent } from './manage-event/event-image/event-image.component';
import { EventPriceComponent } from './manage-event/event-price/event-price.component';
import { EventSignupOpenTillComponent } from './manage-event/event-signup-open-till/event-signup-open-till.component';
import { EventSummaryComponent } from './manage-event/event-summary/event-summary.component';
import { EventTitleComponent } from './manage-event/event-title/event-title.component';
import { EventWhenComponent } from './manage-event/event-when/event-when.component';
import { DeleteEvent, ManageEventComponent } from './manage-event/manage-event.component';
import { ManageEventsComponent, AddNewEvent } from './manage-events/manage-events.component';
import { ManageHotelComponent } from './manage-hotel/manage-hotel.component';
import { ManageHotelsComponent } from './manage-hotels/manage-hotels.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    NgxCurrencyModule,
    CKEditorModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageHotelsComponent,
    ManageHotelComponent,
    ManageEventsComponent,
    ManageEventComponent,
    EventAddressComponent,
    EventImageComponent,
    EventTitleComponent,
    EventPriceComponent,
    EventWhenComponent,
    EventSignupOpenTillComponent,
    EventSummaryComponent,
    AddNewEvent,
    DeleteEvent
  ],
  entryComponents: [
    AddNewEvent,
    DeleteEvent
  ]
})
export class AdminModule { }
