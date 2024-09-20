import { Component, inject } from '@angular/core';
import { CountryService } from '../../core/services/country.service';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../utils/enums/toastType';

@Component({
  selector: 'app-user-country',
  templateUrl: './user-country.component.html',
  styleUrl: './user-country.component.css'
})
export class UserCountryComponent {

  public countryService = inject(CountryService);
  public toastMessage = inject(ToastService);

  constructor() {
        this.countryService.getCountryByName("South Georgia").subscribe( resp => {
          console.log(resp)
        })

        this.toastMessage.message("Titulo","Mensaje", ToastType.SUCCESS);

  }
}
