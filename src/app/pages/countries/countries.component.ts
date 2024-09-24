import { Component, inject, Input, OnInit } from '@angular/core';
import { CountryService } from '../../core/services/country.service';
import { Observable } from 'rxjs';
import { Country } from '../../core/interfaces/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  public listaPaises$!: Observable<Country[]>;
  private countryService = inject(CountryService);
  @Input() regionName!: string;

  ngOnInit(): void {
    this.cargarPaises(this.regionName);
  }

  cargarPaises(regionName: string) {
    this.listaPaises$ = this.countryService.getRegionsByName(regionName);
  }
}
