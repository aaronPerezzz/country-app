import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../utils/enums/toastType';
import { User } from '../interfaces/user';
import { Constants } from '../../utils/constants';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private toastService = inject(ToastService);
  private cookieService = inject(CookieService);

  showNavbar: BehaviorSubject<boolean>;

  /**
   *
   */
  constructor() {
    this.showNavbar = new BehaviorSubject(true);

  }

  /**
   * Lee archivo JSON de usuarios
   * @returns Observable<User[]>
   */
  public readUsersJSON(): Observable<User[]>{
    return this.httpClient
    .get<User[]>(Constants.JSON_USERS)
    .pipe(catchError(this.handleError<any>("readUserJSON", null)));
  }

  /**
   * Realiza peticion a API para crear token
   * @param userInfo token
   * @returns
   */
  public loginUser(userInfo: User){
    return this.httpClient.post(`${Constants.URL_LOGIN}/api/login`, {
      email: userInfo.email,
      password: userInfo.password
    }).pipe(catchError(this.handleError<any>("loginUser", null)));
  }

  /**
   * Guarda token en cookies de navegador
   * @param token
   * @param user
   */
  public setToken(token: string, user: User){
    this.cookieService.set(Constants.ID_TOKEN, JSON.stringify({
      token,
      user
    }));
  }

  /**
   * Obtiene informacion guardada en cookies
   * @returns JSON
   */
  public getToken(){
    return JSON.parse(this.cookieService.get(Constants.ID_TOKEN));
  }

  /**
   * Verifica si existe información en cookies
   * @returns boolean
   */
  public existToken(){
    return this.cookieService.check(Constants.ID_TOKEN);
  }

  /**
   * Elimina información guardad en cookies
   */
  public logout(){
    this.cookieService.delete(Constants.ID_TOKEN);
  }

  public hideNavbar(){
    this.showNavbar.next(false);
  }

  public displayNavBar(){
    this.showNavbar.next(true);
  }



  /**
   * Captura error al realizar peticiones
   * @param operation
   * @param result
   * @returns
   */

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
