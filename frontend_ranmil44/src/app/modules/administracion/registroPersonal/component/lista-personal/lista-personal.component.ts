import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../../shared/modules/prime-module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RegistroPersonalModel } from '../../model/registro-personal-model';
import { RegistroPersonalService } from '../../service/registro-personal.service';
import { NuevoPersonalComponent } from "../nuevo-personal/nuevo-personal.component";

@Component({
  selector: 'app-lista-personal',
  standalone: true,
  imports: [PrimeModule, NuevoPersonalComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './lista-personal.component.html',
  styleUrl: './lista-personal.component.scss'
})
export class ListaPersonalComponent implements OnInit {

  ListaPersonal: RegistroPersonalModel[] = [];
  cargando: boolean = false;

  mostrarModalPersona: boolean = false;
  personalParaEditar: RegistroPersonalModel | null = null;

  constructor(
    private registroPersonalService: RegistroPersonalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.obtenerListaDelPersonal();
  }

  obtenerListaDelPersonal() {
    this.cargando = true;
    this.registroPersonalService.getPersonal().subscribe({

      next: (data) => {
        this.ListaPersonal = data;
        this.cargando = false;
      },
      error: (error) => {
        this.ListaPersonal = [];
        this.cargando = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar al personal.' });
      }
    });
  }

  abrirModalAgregarPersona(): void {
    this.personalParaEditar = null;
    this.mostrarModalPersona = true;
  }


  onPersonaGuardada(personaGuardada: RegistroPersonalModel): void {
    // Validación básica - el hijo ya hizo las validaciones
    if (!personaGuardada) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: 'Datos de persona inválidos'
      });
      return;
    }

    const personaProcesada: RegistroPersonalModel = {
      ...personaGuardada,
      perCedula: personaGuardada.perCedula.trim(),
      perGrado: personaGuardada.perGrado.trim(),
      perArma: personaGuardada.perArma.trim(),
      perApellidos: personaGuardada.perApellidos.trim(),
      perNombres: personaGuardada.perNombres.trim(),
      perCorreo: personaGuardada.perCorreo.trim(),
      perUnidad: personaGuardada.perUnidad.trim(),
    };

    // CORRECCIÓN PRINCIPAL: Usar this.personalParaEditar para determinar si es edición
    if (this.personalParaEditar !== null && this.personalParaEditar.perCedula) {
      // ES EDICIÓN - Usar PUT
      this.registroPersonalService.putPersonal(this.personalParaEditar.perCedula, personaProcesada).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Éxito',
            detail: 'Persona actualizada correctamente'
          });
          this.mostrarModalPersona = false;
          this.obtenerListaDelPersonal();
          this.personalParaEditar = null; // Limpiar después de editar
        },
        error: (error) => {
          this.manejarError(error, 'actualizar');
        }
      });
    } else {
      // ES NUEVO REGISTRO - Usar POST
      this.registroPersonalService.postPersonal(personaProcesada).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Persona registrada correctamente'
          });
          this.mostrarModalPersona = false;
          this.obtenerListaDelPersonal();
        },
        error: (error) => {
          this.manejarError(error, 'crear');
        }
      });
    }
  }

  private manejarError(error: any, operacion: string): void {
    let mensaje = `Error al ${operacion} a la persona`;

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

  editarPersonal(persona: RegistroPersonalModel): void {
    this.personalParaEditar = { ...persona };
    this.mostrarModalPersona = true;
  }

  eliminarPersonal(perCedula: string | undefined): void {
    if (perCedula === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ID de la persona no válido.' });
      return;
    }

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar esta Persona?',
      header: 'Confirma Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.registroPersonalService.deletePersonal(perCedula).subscribe({
          next: () => {
            this.ListaPersonal = this.ListaPersonal.filter(nov => nov.perCedula !== perCedula);
            this.messageService.add({ severity: 'error', summary: 'Eliminado', detail: 'Registro eliminado' });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la persona.' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'La eliminación ha sido cancelada.' });
      }
    });
  }

}
