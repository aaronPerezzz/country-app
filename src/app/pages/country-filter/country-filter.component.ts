import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Country, Currency, Languages } from '../../core/interfaces/country';
import { map, Observable, of } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import { ToastService } from '../../core/services/toast.service';
import { Constants } from '../../utils/constants';
import { ToastType } from '../../utils/enums/toastType';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
/**
 * Clase Filtro
 * @author Alejandro Martínez
 * @since 24/09/25
 */
export class CountryFilterComponent implements OnInit {
  private countryService = inject(CountryService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  isFiltersVisible: boolean = false;

  currenciesList: Currency[] = [];
  languagesList: Languages[] = [];
  subregionsList: string[] = [];

  selectedIdiomas: any[] = [];
  selectedMonedas: any[] = [];
  selectedSubregiones: string[] = [];
  isIndependent: boolean = false;

  region!: string;

  @Output() filtersApplied = new EventEmitter<any>();

  isFiltersApplied: boolean = false;

  isSectionOpen: { [key in 'language' | 'currency' | 'subregion']: boolean } = {
    language: false,
    currency: false,
    subregion: false
  };

  ngOnInit(): void {
    const user = this.authService.getToken();
    this.region = user.user.region;

    this.getCurrencies(this.region);
    this.getLanguages(this.region);
    this.getSubregions(this.region);
}

  /**
   * Obtiene las monedas por region
   * @param regionName
   */
  private getCurrencies(regionName: string){
    this.countryService.getRegionsByName(`${regionName}?fields=currencies`).subscribe((data: any[]) => {
      const allCurrencies = data.map(region => region.currencies).flat();

      const uniqueCurrencyKeys = new Set<string>();

      allCurrencies.forEach(currency => {
        const key = Object.keys(currency)[0]; 
        const currencyData = currency[key]; 
        if (!uniqueCurrencyKeys.has(key)) {
            uniqueCurrencyKeys.add(key);
            this.currenciesList.push(currencyData); 
        }
    });
  },
  (error) => {
    this.toastService.message(Constants.ERROR_CURRENCIES, error.message, ToastType.ERROR)
  });
  }

  /**
     * Obtiene los lenguanjes por region
     * @param regionName
     */
  private getLanguages(regionName: string) {
    this.countryService.getRegionsByName(`${regionName}?fields=languages`).subscribe((data: any[]) => {
        const allLanguages = data.map(region => region.languages).flat();

        const uniqueLanguageKeys = new Set<string>();

        allLanguages.forEach(language => {
            const key = Object.keys(language)[0]; 
            const languageData = language[key]; // Extrae el objeto de idioma
            if (!uniqueLanguageKeys.has(key)) {
                uniqueLanguageKeys.add(key);
                this.languagesList.push(languageData); // Ahora agregamos solo el objeto de idioma
            }
        });
    },
    (error) => {
        this.toastService.message(Constants.ERROR_LANGUAGUES, error.message, ToastType.ERROR);
    });
  }

  /**
     * Obtiene las subregiones por region
     * @param regionName
     */
  private getSubregions(regionName: string) {
    this.countryService.getRegionsByName(`${regionName}?fields=subregion`).subscribe((data: any[]) => {
        const allSubregions = data.map(region => region.subregion).flat();

        // Crear un Set para almacenar subregiones únicas
        const uniqueSubregionKeys = new Set<string>();

        allSubregions.forEach(subregion => {
            if (!uniqueSubregionKeys.has(subregion)) {
                uniqueSubregionKeys.add(subregion);
                this.subregionsList.push(subregion); // Agregar la subregión a la lista
            }
        });
    },
    (error) => {
        this.toastService.message(Constants.ERROR_SUBREGION, error.message, ToastType.ERROR);
    });
  }

  /**
     * Filtra la lista de países 
     */
  public applyFilters() {
    const filters = {
      languages: this.selectedIdiomas,
      currencies: this.selectedMonedas,
      subregions: this.selectedSubregiones,
      independent: this.isIndependent
    };
    this.filtersApplied.emit(filters);
    this.isFiltersApplied = true;
  }

  /**
     * Elimina los valores de los filtros 
     */
  public clearFilters() {
    this.isFiltersApplied = false;
    this.selectedIdiomas = [];
    this.selectedMonedas = [];
    this.selectedSubregiones = [];
    this.isIndependent = false;
    this.filtersApplied.emit({
      languages: this.selectedIdiomas,
      currencies: this.selectedMonedas,
      subregions: this.selectedSubregiones,
      independent: this.isIndependent
    });
  }

  /**
   * Muestra u oculta algún filtro en específico
   */
  toggleSection(section: 'language' | 'currency' | 'subregion') {
    this.isSectionOpen[section] = !this.isSectionOpen[section];
  }

  /**
   * Controla que no se tenga más de un checkbox activo 
   */
  toggleSelection(selectionList: any[], item: any) {
    selectionList.length = 0; 
  
    selectionList.push(item);
  }
  
  /**
   * Muestra u oculta todos los filtros 
   * en pantallas menores a 768px 
   */
   toggleFilters() {
    this.isFiltersVisible = !this.isFiltersVisible;
  }
 
}
