import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { User } from './user.model';
import { ServicioLogger } from '../shared/services/logger.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private keycloakService: KeycloakService,
    private logger: ServicioLogger
  ) { }

  async getUser(): Promise<User | null> {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();


    if (!keycloakInstance || !keycloakInstance.tokenParsed) {
      this.logger.error('Token no disponible o Keycloak no inicializado');
      return null;
    }

    const tokenParsed = keycloakInstance.tokenParsed;

    const roles =
      tokenParsed?.resource_access?.[`${environment.keycloakClientId}`];

    return {
      nombreUsuario: tokenParsed['name'],
      cedula: tokenParsed['preferred_username'],
      roles: roles ?? [],
    };
  }

  async isAuthenticated(): Promise<boolean> {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();
    return keycloakInstance?.authenticated ?? false;
  }

  async login(): Promise<void> {
    try {
      await this.keycloakService.login();
    } catch (error: any) {
      this.logger.error('Login failed', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.keycloakService.logout();
    } catch (error: any) {
      this.logger.error('Logout failed', error);
    }
  }
}
