import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { Constants } from './utils/constants';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(),
  provideAnimations(),
  provideToastr({timeOut: Constants.SHOW_TIME,
    preventDuplicates: true,
    closeButton: true,
    positionClass: Constants.POSITION_TOAST
  }),

  importProvidersFrom(
    HttpClientModule,
  )
]
};
