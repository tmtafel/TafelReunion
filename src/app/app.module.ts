import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { CitiesComponent } from './home/cities/cities.component';
import { NearbyComponent } from './home/nearby/nearby.component';
import { HomeEventsComponent } from './home/home-events/home-events.component';
import { HeaderComponent } from './header/header.component';
import { HotelsComponent } from './home/hotels/hotels.component';
import { MaterialModule } from './shared/modules/material.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CitiesComponent,
    NearbyComponent,
    HomeEventsComponent,
    HeaderComponent,
    HotelsComponent
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
