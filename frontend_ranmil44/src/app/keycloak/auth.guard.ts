import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected override readonly keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  public isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (!this.authenticated) {
        await this.keycloakAngular.login({
          redirectUri: window.location.origin + state.url,
        });
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
