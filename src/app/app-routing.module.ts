import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCountryComponent } from './pages/user-country/user-country.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { NotFoundPageComponent } from './core/shared/not-found-page/not-found-page.component';

const routes: Routes = [
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
    path: '**',
    component: NotFoundPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
