import { Component, inject, Input, OnInit } from '@angular/core';
import { CountryService } from '../../core/services/country.service';
import { map, Observable } from 'rxjs';
import { Country } from '../../core/interfaces/country';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../utils/constants';
import { User } from '../../auth/interfaces/user';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
/**
 * Clase Países
 * @author Alejandro Martínez
 * @since 24/09/25
 */
export class CountriesComponent implements OnInit {
  public countriesList$!: Observable<Country[]>;
  private countryService = inject(CountryService);
  private authService = inject(AuthService);

  private route = inject(ActivatedRoute);
  private countryName: string = Constants.EMPTY_STRING;
  public searchTerm: string = '';
  @Input() regionName!: string;

  ngOnInit(): void {
    const user:User = this.authService.getToken().user;

    if(user.admin){
      this.countryName = this.route.snapshot.paramMap.get('region')!;
      this.getCountries(this.countryName);
    } else {
      this.getCountries(this.regionName);
    }


  }


  /**
   * Regresa una lista de países por region
   * @param regionName
   */
  private getCountries(regionName: string) {
    this.countriesList$ = this.countryService.getRegionsByName(regionName).pipe(
        map(countries => {
            return countries.sort((a: Country, b: Country) =>
                a.name!.common!.localeCompare(b.name!.common!)
            );
        })
    );
  }

  /**
   * Filtra la lista de usuarios por nombre
   * @param countries
   */
   public inputSearch(countries: Country[]): Country[] {
      return countries.filter(country =>
        this.removeAccents(country.translations?.['spa']?.common?.toLowerCase() || '')
          .includes(this.removeAccents(this.searchTerm.toLowerCase()))
      );
  }

  /**
   * Elimina los acentos
   */
  private removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Regresa una lista de países con los filtros aplicados
   * @param filters
   */
  public applyFilters(filters: any) {
    this.countriesList$ = this.countryService.getRegionsByName(this.regionName).pipe(
        map(countries => {
            const filteredCountries = countries.filter((country: Country) => {
                // Filtrar por idiomas
                const languages = country.languages ? Object.values(country.languages) : [];
                const languageMatch = !filters.languages.length ||
                languages.some(language => filters.languages.includes(language));

                // Filtrar por monedas
                const currencies = country.currencies ? Object.values(country.currencies) : [];
                const currencyMatch = !filters.currencies.length ||
                currencies.some(c => filters.currencies.includes(c.name));

                // Filtrar por subregiones
                const subregionMatch = !filters.subregions.length ||
                filters.subregions.includes(country.subregion);

                // Filtrar por independencia
                const independentMatch = !filters.independent || country.independent;

                return languageMatch && currencyMatch && subregionMatch && independentMatch;
            });

            // Ordena alfabéticamente por el nombre después de filtrar
            return filteredCountries.sort((a: Country, b: Country) =>
                a.name!.common!.localeCompare(b.name!.common!)
            );
        })
    );
  }

}
