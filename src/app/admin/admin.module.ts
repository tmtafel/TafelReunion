import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MaterialModule } from '../shared/material.module';
import { AddEventAddressComponent } from './add-event/add-event-address/add-event-address.component';
import { AddEventImageComponent } from './add-event/add-event-image/add-event-image.component';
import { AddEventPriceComponent } from './add-event/add-event-price/add-event-price.component';
import { AddEventSignupOpenTillComponent } from './add-event/add-event-signup-open-till/add-event-signup-open-till.component';
import { AddEventSummaryComponent } from './add-event/add-event-summary/add-event-summary.component';
import { AddEventTitleComponent } from './add-event/add-event-title/add-event-title.component';
import { AddEventWhenComponent } from './add-event/add-event-when/add-event-when.component';
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
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { HotelAddressComponent } from './manage-hotel/hotel-address/hotel-address.component';
import { HotelImageComponent } from './manage-hotel/hotel-image/hotel-image.component';
import { HotelNameComponent } from './manage-hotel/hotel-name/hotel-name.component';
import { HotelPhoneComponent } from './manage-hotel/hotel-phone/hotel-phone.component';
import { ManageHotelComponent } from './manage-hotel/manage-hotel.component';
import { ManageHotelsComponent } from './manage-hotels/manage-hotels.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgxCurrencyModule,
    CKEditorModule,
    HttpClientModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageHotelsComponent,
    ManageHotelComponent,
    HotelAddressComponent,
    HotelNameComponent,
    HotelPhoneComponent,
    HotelImageComponent,
    ManageEventsComponent,
    ManageEventComponent,
    EventAddressComponent,
    EventImageComponent,
    EventTitleComponent,
    EventPriceComponent,
    EventWhenComponent,
    EventSignupOpenTillComponent,
    EventSummaryComponent,
    AddEventTitleComponent,
    AddEventPriceComponent,
    AddEventSummaryComponent,
    AddEventImageComponent,
    AddEventAddressComponent,
    AddEventSignupOpenTillComponent,
    AddEventWhenComponent
  ],
  entryComponents: [
    DeleteEvent
  ]
})
export class AdminModule { }
