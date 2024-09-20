import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCountryComponent } from './pages/user-country/user-country.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { Constants } from './utils/constants';

@NgModule({
  declarations: [
    AppComponent,
    UserCountryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimations(),
    provideToastr({timeOut: Constants.SHOW_TIME,
    preventDuplicates: true,
    closeButton: true,
    positionClass: Constants.POSITION_TOAST
  }),
],
  bootstrap: [AppComponent]
})
export class AppModule { }
