import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, of } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../utils/enums/toastType';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private toastService = inject(ToastService);
  private URLJson: string = 'assets/data/users.json';

  public readUsersJSON(): Observable<User[]>{
    return this.httpClient
    .get<User[]>(this.URLJson)
    .pipe(catchError(this.handleError<any>("readUserJSON", null)));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      if (error) {
        this.toastService.message('Error', error.message, ToastType.ERROR);
      } else {
        this.toastService.message('Error', 'Ha ocurrido un error intente más tarde',ToastType.ERROR);
      }
      return of(result as T);
    };
  }
}
