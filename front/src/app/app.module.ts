import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
import { NavbarComponent } from './navbar/navbar.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ProfileComponent,
    CompanyComponent,
    CatalogComponent,
    CartComponent,
    AuthComponent,
    PortalComponent,
    NavbarComponent,
    CriteriaComponent,
    ProductDetailsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
