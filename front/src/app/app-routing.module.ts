import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {CompanyComponent} from "./company/company.component";
import {MapComponent} from "./map/map.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {AuthComponent} from "./auth/auth.component";
import {PortalComponent} from "./portal/portal.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  { path: 'profile', component:  ProfileComponent},
  { path: 'company', component: CompanyComponent},
  { path: 'map', component:  MapComponent},
  { path: 'catalog', component:  CatalogComponent},
  { path: 'auth', component:  AuthComponent},
  { path: 'portal', component:  PortalComponent},
  { path: 'cart', component:  CartComponent},
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
