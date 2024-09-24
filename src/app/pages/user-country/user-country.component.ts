import { Component, inject, OnInit } from '@angular/core';
import { CountryService } from '../../core/services/country.service';
import { ToastService } from '../../core/services/toast.service';
import { User } from '../../auth/interfaces/user';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../utils/constants';


@Component({
  selector: 'app-user-country',
  templateUrl: './user-country.component.html',
  styleUrl: './user-country.component.css'
})
export class UserCountryComponent implements OnInit{
  name!: string;
  region!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getToken();

    this.name = user.user.firstName; 
    this.region = user.user.region;
  }


}
