import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CountriesComponent } from '../countries/countries.component';

@Component({
  selector: 'app-user-country',
  templateUrl: './user-country.component.html',
  styleUrl: './user-country.component.css'
})
export class UserCountryComponent implements OnInit{
  name!: string;
  region!: string;
  isAdmin: boolean = false;
  @ViewChild('countriesComponent') countriesComponent!: CountriesComponent;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getToken();

    this.name = user.user.firstName;
    this.region = user.user.region;
    this.isAdmin = user.user.admin;
  }


}
