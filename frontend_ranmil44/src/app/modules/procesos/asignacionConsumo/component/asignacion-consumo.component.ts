import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../shared/modules/prime-module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AsignacionConsumoModel } from '../model/asignacion-consumo-model';
import { AsignacionConsumoService } from '../service/asignacion-consumo.service';
import { RegistroNovedadesService } from '../../../administracion/registroNovedades/service/registro-novedades.service';
import { RegistroNovedadesModel } from '../../../administracion/registroNovedades/model/registro-novedades-model';
import { RegistroValoresModel } from '../../../administracion/registro-valores/model/registro-valores-model';
import { forkJoin } from 'rxjs';
import { AsignacionconfrontaModel } from '../model/asignacionconfronta-model';

@Component({
  selector: 'app-asignacion-consumo',
  standalone: true,
  imports: [PrimeModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './asignacion-consumo.component.html',
  styleUrl: './asignacion-consumo.component.scss'
})
export class AsignacionConsumoComponent implements OnInit {

  fechaSeleccionada: Date = new Date();
  cargando: boolean = false;
  asignacionConsumoModel: AsignacionConsumoModel[] = [];
  listaNovedades: RegistroNovedadesModel[] = [];
  novedadSeleccionada: RegistroNovedadesModel | undefined;

  listaValores: RegistroValoresModel[] = [];
  valorDesayuno?: boolean = false;
  valorAlmuerzo?: boolean = false;
  valorMerienda?: boolean = false;

  constructor(
    private asignacionConsumoService: AsignacionConsumoService,
    private registroNovedadesService: RegistroNovedadesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  onFechaSeleccionada() {
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
    // Aquí puedes llamar de nuevo a la función que carga los datos de la tabla,
    // pasándole la nueva fecha para que el backend devuelva la información de ese día.
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    this.cargando = true;
    forkJoin({
      personal: this.asignacionConsumoService.getListaGae44(),
      novedades: this.registroNovedadesService.getNovedades()
    }).subscribe({
      next: (resultados) => {
        this.listaNovedades = resultados.novedades.filter(novedad => novedad.novEstado === 'A');
        const novedadDisponible = this.listaNovedades.find(n => n.novDetalle === 'DISPONIBLE');
        this.asignacionConsumoModel = resultados.personal.map(persona => {
          const personaConNovedad = {
            ...persona,
            novedadSeleccionada: novedadDisponible
          };
          this.onNovedadChange(personaConNovedad);

          return personaConNovedad;
        });

        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los datos iniciales.'
        });
        console.error(err);
      }
    });
  }

  onNovedadChange(personal: AsignacionConsumoModel) {
    if (personal.novedadSeleccionada) {
      const novedad = personal.novedadSeleccionada.novDetalle;

      switch (novedad) {
        case 'GUARDIA':
          personal.valorDesayuno = true;
          personal.valorAlmuerzo = true;
          personal.valorMerienda = true;
          break;
        case 'DISPONIBLE':
          personal.valorDesayuno = false;
          personal.valorAlmuerzo = true;
          personal.valorMerienda = false;
          break;
        case 'COMISIÓN':
        case 'PERMISO':
        case 'LAP':
          personal.valorDesayuno = false;
          personal.valorAlmuerzo = false;
          personal.valorMerienda = false;
          break;
        default:
          personal.valorDesayuno = false;
          personal.valorAlmuerzo = false;
          personal.valorMerienda = false;
          break;
      }
    } else {
      personal.valorDesayuno = false;
      personal.valorAlmuerzo = false;
      personal.valorMerienda = false;
    }
  }


  guardarAsignacion() {
  this.confirmationService.confirm({
    message: '¿Está seguro de guardar la asignación de consumo para cada persona seleccionada?',
    header: 'Confirmar Guardado Masivo',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: () => {
      this.cargando = true;

      // Formatear la fecha a 'YYYY-MM-DD'
      const fechaFormato = this.fechaSeleccionada.toISOString().split('T')[0];

      // 1. Crear un array de Observables (uno por cada POST)
      const postObservables = this.asignacionConsumoModel.map(personal => {

        const payload: AsignacionconfrontaModel = {
          personalList: [
            {
              perCedula: personal.perCedula || '',
              perGrado: personal.perGrado || '',
              perArma: personal.perArma || '',
              perApellidos: personal.perApellidos || 'APELLIDO', // Usar apellidos separados o valor por defecto
              perNombres: personal.perNombres || 'NOMBRE', // Usar nombres separados
              perUnidad: personal.perUnidad || 'G.A.E 44',
              perNovedad: personal.novedadSeleccionada?.novDetalle || 'DISPONIBLE',
              perCorreo: personal.perCorreo || 'correo@default.com' // Usar correo real si existe
            }
          ],
          comidas: {
            // **CORRECCIÓN: Usar los nombres correctos de las propiedades**
            DESAYUNO: personal.valorDesayuno || false,
            ALMUERZO: personal.valorAlmuerzo || false,
            MERIENDA: personal.valorMerienda || false
          },
          fechaAsignacion: fechaFormato
        };

        console.log('Payload a enviar:', payload); // Para debug

        // 2. Devolver el Observable de la llamada POST
        return this.asignacionConsumoService.postAsignacionConfronta(payload);
      });

      // 3. Usar forkJoin para ejecutar todos los POST en paralelo
      forkJoin(postObservables).subscribe({
        next: (responses: any[]) => {
          this.cargando = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Se guardó la asignación de consumo para ${responses.length} personas correctamente.`
          });
        },
        error: (err) => {
          this.cargando = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al guardar una o más asignaciones.'
          });
          console.error('Error al guardar asignaciones:', err);
        }
      });
    }
  });
}
}
