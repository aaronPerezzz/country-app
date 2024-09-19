import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { Constants } from '../../utils/constants';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio encargado de hacer peticiones a regiones
 * @author Aaron Pérez
 * @since 19/09/2024
 */

export class CountryService {


  private httpClient = inject(HttpClient);
  private toastService = inject(ToastrService);

  /**
   * Obtiene el listado de regiones
   * @returns Country[]
   */
  public getAllContries() {
    return this.httpClient.get<Country[]>(Constants.URL_CONTRIES+"/all")
    .pipe(
      tap(_ => console.info()),
      catchError(this.handleError<any>("getAll", null))
    )
  }

  /**
   * Obtiene una ciudad por nombre
   * @param countryName
   * @returns Country
   */
  public getCountryByName(countryName: string){
    return this.httpClient.get<Country[]>(Constants.URL_CONTRIES+`/name/${countryName}`)
    .pipe(
      map((country: Country[]) => country[Constants.NUM0]),
      catchError(this.handleError<any>("getCountryByName", null))
    )
  }

  /**
   * Obtiene información de la región por nombre
   * @param regionName
   * @returns Country[]
   */
  public getRegionsByName(regionName: string){
    return this.httpClient.get<Country[]>(Constants.URL_CONTRIES+`/region/${regionName}`)
    .pipe(
      catchError(this.handleError<any>("getRegionsByName", null))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.error.mensaje) {
        this.showToast('Error', error.error.mensaje);
      } else {
        this.showToast('Error', 'Ha ocurrido un error intente más tarde', );
      }
      return of(result as T);
    };
  }

  showToast(status: string, mensaje: string) {
    this.toastService.error(status, mensaje);
  }

}
