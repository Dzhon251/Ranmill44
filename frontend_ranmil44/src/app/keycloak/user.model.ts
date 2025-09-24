import { KeycloakRoles } from 'keycloak-js';

export interface User {
  nombreUsuario: string;
  cedula: string;
  roles?: any;
}
