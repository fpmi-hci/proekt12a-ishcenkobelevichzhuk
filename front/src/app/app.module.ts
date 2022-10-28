import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { CompanyComponent } from './company/company.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import {HttpClientModule} from "@angular/common/http";
import { PortalComponent } from './portal/portal.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ProfileComponent,
    CompanyComponent,
    CatalogComponent,
    CartComponent,
    AuthComponent,
    PortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
