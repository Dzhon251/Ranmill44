import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloak: KeycloakService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.keycloak.getToken()).pipe(
      switchMap((token) => {
        if (token) {
          this.keycloak.addTokenToHeader();
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(clonedReq);
        }
        return next.handle(req);
      })
    );
  }
}
