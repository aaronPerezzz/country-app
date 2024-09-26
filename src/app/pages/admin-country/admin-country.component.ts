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
    this.getRegions();
  }

  /**
   * Obtiene todas los paises
   */
  private getRegions(){
    this.countryService.getAllContries().subscribe((data:Country[]) => {
      this.regions = this.orderByRegions(data);
      this.countCountriesByRegion(this.regions);
    }, (error) => {
      this.toastService.message("Error", error.message, ToastType.ERROR);
    })
  }

  /**
   * Filtra las regiones sin que se repitan, y ordena el arreglo de forma ascendente
   * @param items
   * @returns Country[]
   */
  private orderByRegions(items: Country[]):Country[]{
    return items.filter((obj, index) => items.findIndex((item) => item.region === obj.region) === index).sort((a, b) => ((a.region < b.region) ? -1 : 1));
  }

  /**
   * Por cada region, enumera los paises y numero de habitantes de cada región
   * @param regions
   */
  private countCountriesByRegion(regions: Country[]){
    for(let i = 0; i < regions.length; i++){
      let regionName = regions[i].region;
      this.countryService.getRegionsByName(regionName).subscribe((data:Country[]) =>{
        regions[i].numCountries = data.length;
        regions[i].numPolutation = data.reduce((accumulator, currentValue) => accumulator + currentValue.population, Constants.NUM0);
      })
    }
  }


}
