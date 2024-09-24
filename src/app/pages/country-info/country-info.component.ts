import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrl: './country-info.component.css'
})
export class CountryInfoComponent {
  countryName!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el parámetro 'name' de la URL como string
    this.countryName = this.route.snapshot.paramMap.get('name')!;
    
    console.log('Country Name:', this.countryName);
  }
}
