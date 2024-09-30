import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user';
import { Constants } from '../../../utils/constants';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{

  showNavbar: boolean = true;
  subscription: Subscription;
  user:User;

  constructor( private authService: AuthService, private router: Router) {
    this.user = {
      id: 0,
      email: Constants.EMPTY_STRING,
      password: Constants.EMPTY_STRING,
      firstName: Constants.EMPTY_STRING,
      lastName:  Constants.EMPTY_STRING,
      country:  Constants.EMPTY_STRING,
      region:  Constants.EMPTY_STRING,
      admin:  false,
      avatar: Constants.AVATAR_DEFAULT};
    this.subscription = this.authService.showNavbar.subscribe((val) => {
      this.showNavbar = val;
    });

  }
  ngOnInit(): void {
    if(this.authService.existToken()){
      this.user = <User>this.authService.getToken().user;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.user = <User>this.authService.getToken().user;
  }

  public logoutUser() {
    if(this.authService.existToken()){
      this.authService.logout();
      this.router.navigateByUrl('/login')
    }
  }



}
