import { Component, inject } from '@angular/core';
import { User } from '../../auth/interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  avatar!: string;
  name!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getToken();

    this.avatar = user.user.avatar; 
    this.name = user.user.email;
    
  }

}
