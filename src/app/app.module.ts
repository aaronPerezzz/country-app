import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCountryComponent } from './pages/user-country/user-country.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { Constants } from './utils/constants';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CountriesComponent } from './pages/countries/countries.component';
import { NavbarComponent } from './core/shared/navbar/navbar.component';
import { NotFoundPageComponent } from './core/shared/not-found-page/not-found-page.component';
import { AdminCountryComponent } from './pages/admin-country/admin-country.component';
import { CountryFilterComponent } from './pages/country-filter/country-filter.component';
import { CountryInfoComponent } from './pages/country-info/country-info.component';
import { GoogleMapsModule } from "@angular/google-maps";


@NgModule({
  declarations: [
    AppComponent,
    UserCountryComponent,
    LoginPageComponent,
    CountriesComponent,
    CountryInfoComponent,
    NavbarComponent,
    NotFoundPageComponent,
    AdminCountryComponent,
    CountryFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleMapsModule
  ],
  providers: [
    provideAnimations(),
    provideToastr({timeOut: Constants.SHOW_TIME,
    preventDuplicates: true,
    closeButton: true,
    positionClass: Constants.POSITION_TOAST
    }),
    CookieService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
