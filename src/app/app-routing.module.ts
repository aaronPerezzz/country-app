import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCountryComponent } from './pages/user-country/user-country.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountryInfoComponent } from './pages/country-info/country-info.component';

const routes: Routes = [ {
  path: '', component: UserCountryComponent
},
{
  path: 'paises',
  component: CountriesComponent
},
{
  path: 'pais/:name',
  component: CountryInfoComponent
},
{
  path: '**', component: UserCountryComponent
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
