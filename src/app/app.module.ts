import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { CitiesComponent } from './home/cities/cities.component';
import { EventsComponent } from './home/events/events.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './home/hotels/hotels.component';
import { NearbyComponent } from './home/nearby/nearby.component';
import { QuestionsComponent } from './home/questions/questions.component';
import { RegisterSignUpComponent } from './home/register-sign-up/register-sign-up.component';
import { MaterialModule } from './shared/modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CitiesComponent,
    NearbyComponent,
    HomeHeaderComponent,
    HotelsComponent,
    EventsComponent,
    RegisterSignUpComponent,
    QuestionsComponent
  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    AdminModule,
    FormsModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
