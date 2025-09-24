import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../../keycloak/user.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>('');
  private cedulaSubject = new BehaviorSubject<string>('');
  private userPhotoSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();
  cedula$ = this.cedulaSubject.asObservable();
  userPhoto$ = this.userPhotoSubject.asObservable();

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {
    this.checkAuth();
  }

  private async checkAuth(): Promise<void> {
    const isAuthenticated = await this.userService.isAuthenticated();
    this._isAuthenticated.next(isAuthenticated);

    if (isAuthenticated) {
      const usuario = await this.userService.getUser();
      console.log('usuario:', usuario);
      if (usuario) {
        this.usernameSubject.next(usuario.nombreUsuario);
        this.cedulaSubject.next(usuario.cedula);
        this.obtenerFoto(usuario.cedula).subscribe((foto) => {
          console.log('foto recibida:', foto);
          this.userPhotoSubject.next(foto);
        });
      }
    } else {
      this.usernameSubject.next('');
      this.cedulaSubject.next('');
      this.userPhotoSubject.next(null);
    }
  }

  get isAuthenticated$() {
    return this._isAuthenticated.asObservable();
  }

  async login(): Promise<void> {
    try {
      await this.userService.login();
      this._isAuthenticated.next(false);
      await this.checkAuth();
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.userService.logout();
      this._isAuthenticated.next(false);
      this.usernameSubject.next('');
      this.cedulaSubject.next('');
      this.userPhotoSubject.next(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  getCedula(): string {
    return this.cedulaSubject.getValue();
  }

  getFoto(): string | null {
    return this.userPhotoSubject.getValue();
  }

  obtenerFoto(cedula: string): Observable<string> {
    return this.http
      .get<{
        imagenBase64: string;
      }>(`${environment.apiSiperComunFoto}militares/remote-images/${cedula}`)
      .pipe(
        map((response) => `data:image/jpeg;base64,${response.imagenBase64}`)
      );
  }
}
