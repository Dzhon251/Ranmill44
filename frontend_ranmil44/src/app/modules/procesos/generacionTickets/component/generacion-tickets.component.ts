import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeModule } from '../../../../shared/modules/prime-module';
import { PdfViewerConfig } from '../../../../shared/components/visor-pdf-generico/pdf-viewer-config';
import { GeneracionTicketsService } from '../service/generacion-tickets.service';
import { VisorPdfGenericoComponent } from "../../../../shared/components/visor-pdf-generico/visor-pdf-generico.component";

@Component({
  selector: 'app-generacion-tickets',
  standalone: true,
  imports: [PrimeModule, VisorPdfGenericoComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './generacion-tickets.component.html',
  styleUrl: './generacion-tickets.component.scss'
})
export class GeneracionTicketsComponent {
  cedula: string = '';
  mostrarVisor: boolean = false;
  mostrarErrores: boolean = false;
  pdfConfig: PdfViewerConfig;

  constructor(
    private generacionTicketsService: GeneracionTicketsService,
    private messageService: MessageService
  ) {this.pdfConfig = {
      pdfService: this.generacionTicketsService,
      fileName: 'ticket.pdf',
      documentName: 'GENERACION DE TICKET',
      serviceParams: { cedula: '' },
      autoLoad: false,
      showToolbar: true,
      showDownloadButton: true,
      showViewButton: true,
      initialView: 'none',
      messages: {
        loading: 'Cargando Ticket...',
        success: 'Ticket generado correctamente',
        error: 'Error al cargar el Ticket',
        emptyState: 'Ingrese una cédula para buscar el Ticket'
      }
    };
  }

  validarCedula(cedula: string): boolean {
    const regex = /^[0-9]{10}$/;
    return regex.test(cedula);
  }

  buscarDocumento(): void {
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
      fileName: `DHP_${this.cedula}.pdf`,
      documentName: `Ticket de C.I: - ${this.cedula}`,
      serviceParams: this.cedula,
      autoLoad: true
    };
  }

  limpiarFormulario(): void {
    this.cedula = '';
    this.mostrarVisor = false;
    this.mostrarErrores = false;

    this.pdfConfig = {
      ...this.pdfConfig,
      serviceParams: { cedula: '' },
      autoLoad: false
    };
  }

  onCedulaChange(): void {
    if (this.cedula.trim() === '') {
      this.mostrarErrores = false;
    } else if (this.validarCedula(this.cedula)) {
      this.mostrarErrores = false;
    }
  }

}
