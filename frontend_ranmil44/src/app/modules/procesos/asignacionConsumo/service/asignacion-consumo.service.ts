import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignacionConsumoModel } from '../model/asignacion-consumo-model';
import { environment } from '../../../../environments/environment';
import { AsignacionconfrontaModel } from '../model/asignacionconfronta-model';

@Injectable({
  providedIn: 'root'
})
export class AsignacionConsumoService {

  private apiUrl = environment.DEV_HOST_BACKEND;

  constructor(
    private http: HttpClient,
  ) { }

  getListaGae44(): Observable<AsignacionConsumoModel[]> {
    return this.http.get<AsignacionConsumoModel[]>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/personalGae44/todas`
    )
  }

  postAsignacionConfronta(datos: AsignacionconfrontaModel): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/asignacionConfronta`,
      datos,
      { responseType: 'text' as 'json' } // <-- ¡IMPORTANTE! Forzar la respuesta a ser TEXTO
    ) as Observable<string>; // Forzamos el tipo de retorno a string
  }
}
