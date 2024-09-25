import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/user';
import { Constants } from '../../utils/constants';
import { CountryService } from '../../core/services/country.service';
import { Country } from '../../core/interfaces/country';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../utils/enums/toastType';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrl: './admin-country.component.css'
})
export class AdminCountryComponent implements OnInit{

  private authService = inject(AuthService);
  private countryService = inject(CountryService);
  private toastService = inject(ToastService);

  user:User;
  regions:Country[] = [];

    /**
     *
     */
    constructor() {
      this.user = {
        id: 0,
        email: Constants.EMPTY_STRING,
        password: Constants.EMPTY_STRING,
        firstName: Constants.EMPTY_STRING,
        lastName:  Constants.EMPTY_STRING,
        country:  Constants.EMPTY_STRING,
        region:  Constants.EMPTY_STRING,
        admin:  false,
        avatar:  Constants.EMPTY_STRING};
    }


  ngOnInit(): void {
    this.user = this.authService.getToken().user;
    this.countryService.getAllContries().subscribe((data:Country[]) => {
      this.regions = <Country[]>data.filter((obj, index) => data.findIndex((item) => item.region === obj.region) === index).sort((a, b) => ((a.region < b.region) ? -1 : 1));
      console.log(this.regions)
    }, (error) => {
      this.toastService.message("Error", error.message, ToastType.ERROR);
    })
  }


}
