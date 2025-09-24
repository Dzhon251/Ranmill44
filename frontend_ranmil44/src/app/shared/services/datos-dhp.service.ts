import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosDhpService {

  private datosDhp: any = {};
  private datosDhpSubject = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
  ) {}

  setDatosDhp(datos: any): void {
    const current = this.datosDhpSubject.value;
    this.datosDhpSubject.next({ ...current, ...datos });
  }

  getDatosDhp(): any {
    return this.datosDhpSubject.value;
  }

  getDatosDhp$(): Observable<any> {
    return this.datosDhpSubject.asObservable();
  }

  clearDatosDhp(): void {
    this.datosDhpSubject.next({});
  }


}
