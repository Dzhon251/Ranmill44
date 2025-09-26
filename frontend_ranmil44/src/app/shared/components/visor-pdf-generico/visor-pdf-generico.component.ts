import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { PdfViewerConfig } from './pdf-viewer-config';
import { PrimeModule } from "../../modules/prime-module";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-visor-pdf-generico',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './visor-pdf-generico.component.html',
  styleUrl: './visor-pdf-generico.component.scss'
})
export class VisorPdfGenericoComponent implements OnInit, OnDestroy {

  @Input() config!: PdfViewerConfig;
  isLoading: boolean = false;
  error: string = '';
  pdfUrl: SafeResourceUrl | null = null;
  zoomLevel: number = 100;

  private unsubscribe$ = new Subject<void>();
  private defaultConfig: Partial<PdfViewerConfig> = {
    autoLoad: false,
    initialZoom: 100,
    serviceParams: undefined,
    messages: {
      loading: 'Cargando documento...',
      success: 'Documento cargado correctamente',
      error: 'Error al cargar el documento',
      noDocument: 'No hay documento para mostrar'
    }
  };

  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.config = {
      ...this.defaultConfig,
      ...this.config,
      messages: { ...this.defaultConfig.messages, ...this.config?.messages }
    };

    this.zoomLevel = this.config.initialZoom!;

    if (this.config.autoLoad) {
      this.cargarDocumento();
    }
  }

  onPdfLoad(): void {
    console.log('PDF cargado correctamente');
  }

  cargarDocumento(): void {
    this.isLoading = true;
    this.error = '';

    const serviceCall = this.config.serviceParams
      ? this.config.pdfService.getPdf(this.config.serviceParams)
      : this.config.pdfService.getPdf();

    serviceCall.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (blob: Blob) => {
        this.handlePdfSuccess(blob);
      },
      error: (error: HttpErrorResponse) => {
        this.handlePdfError(error);
      }
    });
  }

  private handlePdfSuccess(blob: Blob): void {
    this.isLoading = false;
    const url = window.URL.createObjectURL(blob);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: this.config.messages!.success,
      life: 3000
    });
  }

  private handlePdfError(error: HttpErrorResponse): void {
    this.isLoading = false;
    this.error = this.config.messages!.error ?? 'Error al cargar el documento';

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.config.messages!.error,
      life: 5000
    });

    console.error('Error al cargar PDF:', error);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.pdfUrl) {
      window.URL.revokeObjectURL(this.pdfUrl.toString());
    }
  }
}