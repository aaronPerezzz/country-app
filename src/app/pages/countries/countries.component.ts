import { Component, inject, Input, OnInit } from '@angular/core';
import { CountryService } from '../../core/services/country.service';
import { Observable } from 'rxjs';
import { Country } from '../../core/interfaces/country';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  public listaPaises$!: Observable<Country[]>;
  private countryService = inject(CountryService);

  private route = inject(ActivatedRoute);
  countryName: string = Constants.EMPTY_STRING;
  @Input() regionName!: string;

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('name') !== undefined){
      this.countryName = this.route.snapshot.paramMap.get('name')!;
      this.cargarPaises(this.countryName);
    } else {
      this.cargarPaises(this.regionName);
    }
  }

  cargarPaises(regionName: string) {
    this.listaPaises$ = this.countryService.getRegionsByName(regionName);
  }
}
