import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { RegistroPersonalModel } from '../model/registro-personal-model';

@Injectable({
  providedIn: 'root'
})
export class RegistroPersonalService {

private apiUrl = environment.DEV_HOST_BACKEND;


  constructor(
    private http: HttpClient,
  ) { }

  getPersonal(): Observable<RegistroPersonalModel[]> {
    return this.http.get<RegistroPersonalModel[]>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/personalGae44/todas`
    )
  }

  postPersonal(datos: RegistroPersonalModel): Observable<RegistroPersonalModel> {
    return this.http.post<RegistroPersonalModel>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/personalGae44`,
      datos
    )
  }

  putPersonal(cedula: string, datos: RegistroPersonalModel): Observable<RegistroPersonalModel> {
    return this.http.put<RegistroPersonalModel>(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/personalGae44/${cedula}`,
      datos
    )
  }

  deletePersonal(cedula: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/dev/dimt/dhp/declaracion_historial_personal/personalGae44/${cedula}`,
    );
  }
}
