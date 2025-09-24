import { Component, OnInit } from '@angular/core';
import { RegistroValoresService } from '../service/registro-valores.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RegistroValoresModel } from '../model/registro-valores-model';
import { PrimeModule } from "../../../../shared/modules/prime-module";
import { NuevoRegistroValorComponent } from "./nuevo-registro-valor/nuevo-registro-valor.component";

@Component({
  selector: 'app-registro-valores',
  standalone: true,
  imports: [PrimeModule, NuevoRegistroValorComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './registro-valores.component.html',
  styleUrl: './registro-valores.component.scss'
})
export class RegistroValoresComponent implements OnInit {

  listaValores: RegistroValoresModel[] = [];
  cargando: boolean = false;

  mostrarModalValor: boolean = false;
  valorParaEditar: RegistroValoresModel | null = null;

  constructor(
    private registroValoresService: RegistroValoresService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.obtenerlistaValores();
  }

  obtenerlistaValores() {
    this.cargando = true;
    this.registroValoresService.getValores().subscribe({

      next: (data) => {
        this.listaValores = data.filter(valor => valor.novEstado === 'A');
        this.cargando = false;
      },
      error: (error) => {
        this.listaValores = [];
        this.cargando = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los valores.' });
      }
    });
  }

  abrirModalAgregarValor(): void {
    this.valorParaEditar = null;
    this.mostrarModalValor = true;
  }

  onValorGuardado(valorGuardado: RegistroValoresModel): void {
    if (!valorGuardado.rvaDetalle || !valorGuardado.rvaDetalle.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: 'El detalle del valor es requerido'
      });
      return;
    }

    const valorProcesado: RegistroValoresModel = {
      ...valorGuardado,
      novEstado: valorGuardado.novEstado || 'A',
      rvaDetalle: valorGuardado.rvaDetalle.trim(),
      rvaCosto: valorGuardado.rvaCosto
    };

    if (valorProcesado.id) {
      this.registroValoresService.putValores(valorProcesado.id, valorProcesado).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Éxito',
            detail: 'Valor actualizado correctamente'
          });
          this.mostrarModalValor = false;
          this.obtenerlistaValores();
        },
        error: (error) => {
          this.manejarError(error, 'actualizar');
        }
      });
    } else {
      this.registroValoresService.postValores(valorProcesado).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Valor creado correctamente'
          });
          this.mostrarModalValor = false;
          this.obtenerlistaValores();
        },
        error: (error) => {
          this.manejarError(error, 'crear');
        }
      });
    }
  }

  private manejarError(error: any, operacion: string): void {
    let mensaje = `Error al ${operacion} el valor`;

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

  editarValor(valor: RegistroValoresModel): void {
    this.valorParaEditar = { ...valor };
    this.mostrarModalValor = true;
  }

  eliminarValor(id: number | undefined): void {
    if (id === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ID del valor no válido.' });
      return;
    }

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este valor?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.registroValoresService.deleteValores(id).subscribe({
          next: () => {
            this.listaValores = this.listaValores.filter(nov => nov.id !== id);
            this.messageService.add({ severity: 'error', summary: 'Eliminado', detail: 'eliminado.' });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el valor.' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'La eliminación ha sido cancelada.' });
      }
    });
  }
}