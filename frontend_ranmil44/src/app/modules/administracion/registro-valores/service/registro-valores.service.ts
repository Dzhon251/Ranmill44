import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroValoresModel } from '../model/registro-valores-model';

@Injectable({
  providedIn: 'root'
})
export class RegistroValoresService {

  private apiUrl = environment.DEV_HOST_BACKEND;


  constructor(
    private http: HttpClient,
  ) { }

  getValores(): Observable<RegistroValoresModel[]> {
    return this.http.get<RegistroValoresModel[]>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/valorConsumo`
    )
  }

  postValores(datos: RegistroValoresModel): Observable<RegistroValoresModel> {
    return this.http.post<RegistroValoresModel>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/valorConsumo`,
      datos
    )
  }

  putValores(id: number, datos: RegistroValoresModel): Observable<RegistroValoresModel> {
    return this.http.put<RegistroValoresModel>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/valorConsumo/${id}`,
      datos
    )
  }

  deleteValores(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/valorConsumo/${id}`,
    );
  }
}
