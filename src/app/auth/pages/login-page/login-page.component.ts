import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { User } from '../../interfaces/user';
import { ToastType } from '../../../utils/enums/toastType';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../../../utils/constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

/**
 * Clase login
 * @author Aaron Pérez
 * @since 23/09/2024
 */
export class LoginPageComponent implements OnInit, OnDestroy {


  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  usersData: User[] = [];
  existError: boolean = false;
  formLogin: FormGroup;
  email: string = Constants.EMPTY_STRING;
  password: string = Constants.EMPTY_STRING;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      inputEmail: new FormControl<string>(Constants.EMPTY_STRING, [
        Validators.required,
        Validators.email
      ]),
      inputPassword: new FormControl<string>(Constants.EMPTY_STRING, [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    this.authService.hideNavbar();
    this.getAllUser();
    if(this.authService.existToken()){
      this.router.navigateByUrl('userCountry');
    }
  }

  ngOnDestroy(): void {

    this.authService.displayNavBar();
  }

  /**
   * Obtiene los usuarios de archivo json
   */
  private getAllUser() {
    this.authService.readUsersJSON().subscribe(data => {
      this.usersData = data
    }, (error) => {
      this.toastService.message(Constants.ERROR_USERS, error.message, ToastType.ERROR)
    });
  }

  /**
   * Inicio de sesión de usuario
   * @param event
   */
  public loginSubmit(event: Event) {
    event.preventDefault();
    const valueForm = this.formLogin.value;
    if (this.formLogin.valid) {
      this.findUserLongin(valueForm.inputEmail, valueForm.inputPassword);
    }
  }

  /**
   * Busca usuario en array de usuarios
   * @param email
   * @param password
   */
  private findUserLongin(email: string, password: string) {
    const userFind = <User>this.usersData.find(user => user.email.match(email) && user.password.match(password));
    if (userFind == undefined) {
      this.toastService.message(Constants.ERROR_LOGIN, Constants.MESSA_ERROR_LOGIN, ToastType.WARNING)
      this.email = Constants.EMPTY_STRING;
      this.password = Constants.EMPTY_STRING

    } else {
      this.authService.loginUser(userFind).subscribe(data => {
        this.authService.setToken(data.token, userFind);
        this.router.navigateByUrl("userCountry");
      })
    }
  }

  public visiblePassword(event: any){
    this.showPassword = event.target.checked;
  }

}
