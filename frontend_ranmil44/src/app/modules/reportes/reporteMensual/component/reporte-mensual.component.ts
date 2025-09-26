import { Component } from '@angular/core';
import { PrimeModule } from "../../../../shared/modules/prime-module";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReporteMensualService } from '../service/reporte-mensual.service';
import { PdfViewerConfig } from '../../../../shared/components/visor-pdf-generico/pdf-viewer-config';
import { VisorPdfGenericoComponent } from "../../../../shared/components/visor-pdf-generico/visor-pdf-generico.component";

@Component({
  selector: 'app-reporte-mensual',
  standalone: true,
  imports: [PrimeModule, VisorPdfGenericoComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './reporte-mensual.component.html',
  styleUrl: './reporte-mensual.component.scss'
})
export class ReporteMensualComponent {
  cedula: string = '';
  mostrarVisor: boolean = false;
  mostrarErrores: boolean = false;
  pdfConfig: PdfViewerConfig;

  constructor(
    private reporteMensualService: ReporteMensualService
  ) {
    this.pdfConfig = {
      pdfService: this.reporteMensualService,
      fileName: 'reporte_mensual.pdf',
      documentName: 'REPORTE MENSUAL - RECIBO',
      serviceParams: { cedula: '' },
      autoLoad: false,
      showToolbar: true,
      showDownloadButton: true,
      showViewButton: true,
      initialView: 'none',
      messages: {
        loading: 'Generando reporte individual...',
        success: 'Reporte generado correctamente',
        error: 'Error al generar el reporte',
        emptyState: 'Ingrese una cédula para generar el reporte'
      }
    };
  }

  validarCedula(cedula: string): boolean {
    const regex = /^[0-9]{10}$/;
    return regex.test(cedula);
  }

  generarReporte(): void {
    this.cedula = this.cedula.trim();

    if (!this.cedula) {
      this.mostrarErrores = true;
      return;
    }

    if (!this.validarCedula(this.cedula)) {
      this.mostrarErrores = true;
      return;
    }

    this.mostrarErrores = false;
    this.mostrarVisor = true;
    this.pdfConfig = {
      ...this.pdfConfig,
      serviceParams: { cedula: this.cedula },
      autoLoad: true
    };
  }

  limpiarFormulario(): void {
    this.cedula = '';
    this.mostrarVisor = false;
    this.mostrarErrores = false;
  }

}
