import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCountryComponent } from './pages/user-country/user-country.component';

const routes: Routes = [ {
  path: '', component: UserCountryComponent
},
{
  path: '**', component: UserCountryComponent
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
