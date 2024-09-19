import { Routes } from '@angular/router';
import { UserCountryComponent } from './pages/userCountry/user-country.component';

export const routes: Routes = [
  {
    path: '', component: UserCountryComponent
  },
  {
    path: '**', component: UserCountryComponent
  }
];
