import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxCurrencyModule } from 'ngx-currency';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ManageHotelsComponent } from './manage-hotels/manage-hotels.component';
import { MaterialModule } from '../shared/material.module';
import { ManageHotelComponent } from './manage-hotel/manage-hotel.component';
import { HotelAddressComponent } from './manage-hotel/hotel-address/hotel-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelNameComponent } from './manage-hotel/hotel-name/hotel-name.component';
import { HotelPhoneComponent } from './manage-hotel/hotel-phone/hotel-phone.component';
import { HotelImageComponent } from './manage-hotel/hotel-image/hotel-image.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { EventAddressComponent } from './manage-event/event-address/event-address.component';
import { EventImageComponent } from './manage-event/event-image/event-image.component';
import { EventTitleComponent } from './manage-event/event-title/event-title.component';
import { EventPriceComponent } from './manage-event/event-price/event-price.component';
import { EventWhenComponent } from './manage-event/event-when/event-when.component';
import { EventSignupOpenTillComponent } from './manage-event/event-signup-open-till/event-signup-open-till.component';
import { EventSummaryComponent } from './manage-event/event-summary/event-summary.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFileUploadModule,
    NgxMaterialTimepickerModule,
    NgxCurrencyModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
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
    EventSummaryComponent
  ]
})
export class AdminModule { }
