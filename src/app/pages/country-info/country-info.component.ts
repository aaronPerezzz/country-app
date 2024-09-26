import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../core/services/country.service';
import { Country, Currency, Languages } from '../../core/interfaces/country';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrl: './country-info.component.css'
})
export class CountryInfoComponent implements OnInit {
  country$!: Observable<Country>;  
  countryName!: string;
  center: google.maps.LatLngLiteral = { lat: -34.5, lng: 151.5 }; 
  zoom = 5;

  constructor(private route: ActivatedRoute, private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get('name')!;
    
    // Asignamos el observable a country$ en vez de suscribirnos manualmente
    this.country$ = this.countryService.getCountryByName(this.countryName);

    // Suscripción solo para actualizar el centro del mapa
    this.country$.subscribe((country) => {
      if (country && country.latlng) {
        this.center = { lat: country.latlng[0], lng: country.latlng[1] };
        console.log('Latitud:', this.center.lat, 'Longitud:', this.center.lng);
      }
    });
  }

  getLanguageEntries(languages: Languages | undefined): [string, string][] {
    return languages ? Object.entries(languages) : []; 
  }

  getCurrenciesArray(currencies?: { [key: string]: Currency }): Array<{ key: string, value: Currency }> {
    return currencies ? Object.entries(currencies).map(([key, value]) => ({ key, value })) : [];
  }

}