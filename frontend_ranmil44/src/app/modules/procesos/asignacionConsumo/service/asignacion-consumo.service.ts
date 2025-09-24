import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignacionConsumoModel } from '../model/asignacion-consumo-model';
import { environment } from '../../../../environments/environment';

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
}
