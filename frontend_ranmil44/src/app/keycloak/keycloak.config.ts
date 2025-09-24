import { KeycloakOptions } from 'keycloak-angular';
import { environment } from '../environments/environment';


export const keycloakConfig: KeycloakOptions = {
  config: {
    url: `${environment.keycloakUri}`,
    realm: 'realm_intern',
    clientId: `${environment.keycloakClientId}`,
  },
  initOptions: {
    onLoad: 'login-required',
    checkLoginIframe: false,
  },
  enableBearerInterceptor: true,
  bearerPrefix: 'Bearer',
  bearerExcludedUrls: ['/assets', '/public'],
};
