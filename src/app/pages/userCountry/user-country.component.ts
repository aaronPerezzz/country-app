import { Component, inject } from '@angular/core';
import { CountryService } from '../../core/services/country.service';

@Component({
  selector: 'app-user-country',
  standalone: true,
  imports: [],
  templateUrl: './user-country.component.html',
  styleUrl: './user-country.component.css'
})
export class UserCountryComponent {
  public countryService = inject(CountryService);

  constructor() {
        this.countryService.getCountryByName("South Georgia").subscribe( resp => {
          console.log(resp)
        })
  }
}
