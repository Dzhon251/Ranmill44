import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoServicio {
  private cargandoSubject = new BehaviorSubject<boolean>(true);
  cargando$ = this.cargandoSubject.asObservable();

  private errorSubject = new BehaviorSubject<any>(null);
  error$ = this.errorSubject.asObservable();

  setCargando(cargando: boolean) {
    this.cargandoSubject.next(cargando);
  }

  setError(error: any) {
    this.errorSubject.next(error);
  }
}
