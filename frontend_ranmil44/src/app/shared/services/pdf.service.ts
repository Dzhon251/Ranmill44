import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface PdfResponse {
  url: string;
  filename: string;
  size: number;
  pages?: number;
}

export interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  
  // Reemplaza con la URL base de tu API
  private apiUrl = 'https://tu-api.com/api/pdfs';
  
  constructor(private http: HttpClient) {}
  
  /**
   * Obtiene la URL de un PDF para visualización
   * @param pdfId ID del PDF o nombre del archivo
   */
  getPdfUrl(pdfId: string): Observable<string> {
    // Ejemplo de implementación - adapta a tu API
    return this.http.get<{url: string}>(`${this.apiUrl}/${pdfId}/view`)
      .pipe(
        map(response => response.url),
        catchError(error => {
          console.error('Error obteniendo URL del PDF:', error);
          // Retorna una URL de ejemplo en caso de error
          return of('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
        })
      );
  }
  
  /**
   * Obtiene información detallada de un PDF
   * @param pdfId ID del PDF
   */
  getPdfInfo(pdfId: string): Observable<PdfResponse> {
    return this.http.get<PdfResponse>(`${this.apiUrl}/${pdfId}`)
      .pipe(
        catchError(error => {
          console.error('Error obteniendo información del PDF:', error);
          return of({
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            filename: 'documento.pdf',
            size: 1024,
            pages: 1
          });
        })
      );
  }
  
  /**
   * Sube un archivo PDF
   * @param file Archivo PDF a subir
   */
  uploadPdf(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('pdf', file);
    
    const headers = new HttpHeaders();
    // Agrega headers necesarios para tu API
    // headers.append('Authorization', 'Bearer ' + token);
    
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload`, formData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error subiendo PDF:', error);
          return of({
            success: false,
            url: '',
            filename: file.name,
            message: 'Error al subir el archivo'
          });
        })
      );
  }
  
  /**
   * Descarga un PDF
   * @param pdfId ID del PDF
   */
  downloadPdf(pdfId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${pdfId}/download`, { responseType: 'blob' })
      .pipe(
        catchError(error => {
          console.error('Error descargando PDF:', error);
          throw error;
        })
      );
  }
  
  /**
   * Elimina un PDF
   * @param pdfId ID del PDF
   */
  deletePdf(pdfId: string): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${this.apiUrl}/${pdfId}`)
      .pipe(
        catchError(error => {
          console.error('Error eliminando PDF:', error);
          return of({ success: false });
        })
      );
  }
  
  /**
   * Obtiene la lista de PDFs disponibles
   */
  getPdfList(): Observable<PdfResponse[]> {
    return this.http.get<PdfResponse[]>(`${this.apiUrl}/list`)
      .pipe(
        catchError(error => {
          console.error('Error obteniendo lista de PDFs:', error);
          return of([]);
        })
      );
  }
  
  /**
   * Crea una URL segura para visualización
   * @param url URL del PDF
   */
  createSecureUrl(url: string): string {
    // Si tu API requiere autenticación, puedes agregar tokens aquí
    // return `${url}?token=${this.getAuthToken()}`;
    return url;
  }
  
  /**
   * Valida si un archivo es un PDF válido
   * @param file Archivo a validar
   */
  validatePdfFile(file: File): boolean {
    return file.type === 'application/pdf' && file.size > 0;
  }
  
  /**
   * Formatea el tamaño del archivo
   * @param bytes Tamaño en bytes
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
} 