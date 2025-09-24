import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeModule } from '../../../../shared/modules/prime-module';
import { RegistroNovedadesService } from './../service/registro-novedades.service';
import { RegistroNovedadesModel } from '../model/registro-novedades-model';
import { NuevoRegistroNovedadComponent } from "./nuevo-registro-novedad/nuevo-registro-novedad.component";

@Component({
  selector: 'app-registro-novedades',
  standalone: true,
  imports: [PrimeModule, NuevoRegistroNovedadComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './registro-novedades.component.html',
  styleUrl: './registro-novedades.component.scss'
})
export class RegistroNovedadesComponent implements OnInit {

  listaNovedades: RegistroNovedadesModel[] = [];
  cargando: boolean = false;

  mostrarModalNovedad: boolean = false;
  novedadParaEditar: RegistroNovedadesModel | null = null;

  constructor(
    private registroNovedadesService: RegistroNovedadesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.obtenerListaNovedades();
  }

  obtenerListaNovedades() {
    this.cargando = true;
    this.registroNovedadesService.getNovedades().subscribe({
      
      next: (data) => {
        this.listaNovedades = data.filter(novedad => novedad.novEstado === 'A');
        this.cargando = false;
      },
      error: (error) => {
        this.listaNovedades = [];
        this.cargando = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las novedades.' });
      }
    });
  }

  abrirModalAgregarNovedad(): void {
    this.novedadParaEditar = null;
    this.mostrarModalNovedad = true;
  }

  onNovedadGuardada(novedadGuardada: RegistroNovedadesModel): void {
    if (!novedadGuardada.novDetalle || !novedadGuardada.novDetalle.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: 'El detalle de la novedad es requerido'
      });
      return;
    }

    const novedadProcesada: RegistroNovedadesModel = {
      ...novedadGuardada,
      novEstado: novedadGuardada.novEstado || 'A',
      novDetalle: novedadGuardada.novDetalle.trim(),
      novObservacion: novedadGuardada.novObservacion?.trim() || ''
    };

    if (novedadProcesada.id) {
      this.registroNovedadesService.putNovedades(novedadProcesada.id, novedadProcesada).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Éxito',
            detail: 'Novedad actualizada correctamente'
          });
          this.mostrarModalNovedad = false;
          this.obtenerListaNovedades();
        },
        error: (error) => {
          this.manejarError(error, 'actualizar');
        }
      });
    } else {
      this.registroNovedadesService.postNovedades(novedadProcesada).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Novedad creada correctamente'
          });
          this.mostrarModalNovedad = false;
          this.obtenerListaNovedades();
        },
        error: (error) => {
          this.manejarError(error, 'crear');
        }
      });
    }
  }

  private manejarError(error: any, operacion: string): void {
    let mensaje = `Error al ${operacion} la novedad`;

    if (error.status === 400) {
      mensaje = 'Datos inválidos enviados al servidor. Verifique el formato.';
    } else if (error.status === 500) {
      mensaje = 'Error interno del servidor. Intente nuevamente.';
    } else if (error.error?.message) {
      mensaje = error.error.message;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje
    });
  }

  editarNovedad(novedad: RegistroNovedadesModel): void {
    this.novedadParaEditar = { ...novedad };
    this.mostrarModalNovedad = true;
  }

  eliminarNovedad(id: number | undefined): void {
    if (id === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ID de novedad no válido.' });
      return;
    }

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar esta novedad?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.registroNovedadesService.deleteNovedades(id).subscribe({
          next: () => {
            this.listaNovedades = this.listaNovedades.filter(nov => nov.id !== id);
            this.messageService.add({ severity: 'error', summary: 'Eliminado', detail: 'eliminada' });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la novedad.' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'La eliminación ha sido cancelada.' });
      }
    });
  }
}