import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneracionTicketsService {

  private apiUrl = environment.DEV_HOST_BACKEND;
cedula: string = '';

  constructor(
    private http: HttpClient,
  ) { }

  getMiDhp(cedula: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/ticketQr/pdf/${cedula}`, {
      responseType: 'blob'
    });
  }

  getPdf(cedula: string): Observable<Blob> {
    return this.getMiDhp(cedula);
  }

}
