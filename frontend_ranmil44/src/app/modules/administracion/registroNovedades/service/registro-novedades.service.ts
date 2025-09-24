import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroNovedadesModel } from '../model/registro-novedades-model';

@Injectable({
  providedIn: 'root'
})
export class RegistroNovedadesService {

  private apiUrl = environment.DEV_HOST_BACKEND;


  constructor(
    private http: HttpClient,
  ) { }

  getNovedades(): Observable<RegistroNovedadesModel[]> {
    return this.http.get<RegistroNovedadesModel[]>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/registroNovedades`
    )
  }

  postNovedades(datos: RegistroNovedadesModel): Observable<RegistroNovedadesModel> {
    return this.http.post<RegistroNovedadesModel>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/registroNovedades`,
      datos
    )
  }

  putNovedades(id: number, datos: RegistroNovedadesModel): Observable<RegistroNovedadesModel> {
    return this.http.put<RegistroNovedadesModel>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/registroNovedades/${id}`,
      datos
    )
  }

  deleteNovedades(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/registroNovedades/${id}`,
    );
  }

}
