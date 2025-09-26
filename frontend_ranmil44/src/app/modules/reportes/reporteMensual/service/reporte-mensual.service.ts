import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteMensualService {

  private apiUrl = environment.DEV_HOST_BACKEND

  constructor(
    private http: HttpClient,
  ) { }

  getRepoPerExt(cedula: string): Observable<Blob> {
    const params = new HttpParams()
      .set('cedula', cedula)
      .set('format', 'pdf');

    return this.http.get(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/reporteMenssualGae44/cedula`,
      {
        params: params,
        responseType: 'blob'
      }
    );
  }

  getPdf(params?: any): Observable<Blob> {
    const cedula = params?.cedula;
    if (!cedula) {
      throw new Error('Se requiere el número de cédula');
    }
    return this.getRepoPerExt(cedula);
  }
}
