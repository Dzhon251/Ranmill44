import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ComponenteApp } from './app/app.component';
import { KeycloakService } from 'keycloak-angular';
import { keycloakConfig } from './app/keycloak/keycloak.config';
import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

function initializeKeycloak(keycloak: KeycloakService) {
  return async () => {
    try {
      const initialized = await keycloak.init({
        config: keycloakConfig.config,
        initOptions: keycloakConfig.initOptions,
        bearerExcludedUrls: keycloakConfig.bearerExcludedUrls,
      });
      console.log('Keycloak initialized:', initialized);
    } catch (error) {
      console.error('Keycloak initialization failed:', error);
    }
  };
}

bootstrapApplication(ComponenteApp, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-EC'
    },
  ],
}).catch((err) => console.error(err));