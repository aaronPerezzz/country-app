import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCountryComponent } from './pages/user-country/user-country.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { NotFoundPageComponent } from './core/shared/not-found-page/not-found-page.component';
import { CountryInfoComponent } from './pages/country-info/country-info.component';
import { CountriesComponent } from './pages/countries/countries.component';

const routes: Routes = [
  {
    path: '',
    component: UserCountryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'userCountry',
    component: UserCountryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'country/:name',
    component: CountryInfoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'region/:region',
    component: CountriesComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
