import { Component, OnInit } from '@angular/core';
import { PrimeModule } from '../../../../shared/modules/prime-module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AsignacionConsumoModel } from '../model/asignacion-consumo-model';
import { AsignacionConsumoService } from '../service/asignacion-consumo.service';
import { RegistroNovedadesService } from '../../../administracion/registroNovedades/service/registro-novedades.service';
import { RegistroNovedadesModel } from '../../../administracion/registroNovedades/model/registro-novedades-model';
import { RegistroValoresModel } from '../../../administracion/registro-valores/model/registro-valores-model';
import { forkJoin } from 'rxjs';

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
}
