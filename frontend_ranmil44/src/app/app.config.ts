import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthInterceptor } from './keycloak/auth.interceptor';
import { AuthGuard } from './keycloak/auth.guard';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registrar el locale español
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(withInterceptorsFromDi(), withFetch()),

    AuthGuard,
    KeycloakService,
    KeycloakAngularModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    provideAnimations(),

    provideStore(),

    // Configurar el locale español globalmente
    { provide: LOCALE_ID, useValue: 'es' },

  ],
};
