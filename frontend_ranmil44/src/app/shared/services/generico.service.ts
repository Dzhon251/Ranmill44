import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericoService<T> {
  constructor(
    protected http: HttpClient,
    @Inject('url') protected url: string
  ) {}

  buscarTodos(): Observable<T[]> {
    return this.http.get<T[]>(this.url).pipe(
      tap((data: T[]) => {
        return data;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  buscarPorId(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`).pipe(
      tap((data: T) => data),
      catchError((error) => throwError(() => error))
    );
  }

  crear(entidad: T, headersConfig?: HttpHeaders): Observable<T> {
    const headers = headersConfig || new HttpHeaders();
    if (!entidad) {
      return throwError(() => new Error('Entidad no puede ser indefinida'));
    }
    return this.http.post<T>(this.url, entidad, { headers }).pipe(
      tap((data: T) => data),
      catchError((error) => throwError(() => error))
    );
  }

  crearLista(entidades: T[]): Observable<T[]> {
    return this.http.post<T[]>(`${this.url}/guardarLista`, entidades).pipe(
      tap((data: T[]) => data),
      catchError((error) => throwError(() => error))
    );
  }

  actualizar(entidad: T): Observable<T> {
    return this.http.put<T>(this.url, entidad).pipe(
      tap((data: T) => data),
      catchError((error) => throwError(() => error))
    );
  }

  eliminarPorId(id: number): Observable<T> {
    return this.http.delete<T>(`${this.url}/${id}`).pipe(
      tap((data: T) => data),
      catchError((error) => throwError(() => error))
    );
  }

  eliminarLogicoPorId(payload: { id: number; cedula: string }): Observable<T> {
    const params = new HttpParams().set('cedula', payload.cedula);
    return this.http.delete<T>(`${this.url}/${payload.id}`, { params }).pipe(
      tap((data: T) => data),
      catchError((error) => throwError(() => error))
    );
  }

  obtenerTodosObj(): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/lista`).pipe(
      tap((data: T[]) => {
        return data;
      }),
      catchError((error) => throwError(() => error))
    );
  }
}
