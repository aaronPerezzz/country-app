import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy{

  showNavbar: boolean = true;
  subscription: Subscription;

  constructor( private authService: AuthService) {

    this.subscription = this.authService.showNavbar.subscribe((val) => {
      this.showNavbar = val;
    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
