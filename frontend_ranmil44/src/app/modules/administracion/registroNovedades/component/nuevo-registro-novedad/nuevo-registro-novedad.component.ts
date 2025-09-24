import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegistroNovedadesModel } from '../../model/registro-novedades-model';
import { PrimeModule } from '../../../../../shared/modules/prime-module';

@Component({
  selector: 'app-nuevo-registro-novedad',
  standalone: true,
  imports: [PrimeModule],
  providers: [MessageService],
  templateUrl: './nuevo-registro-novedad.component.html',
  styleUrl: './nuevo-registro-novedad.component.scss'
})
export class NuevoRegistroNovedadComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  novedadActual: RegistroNovedadesModel = this.inicializarNovedad();

  @Input() novedadInicial: RegistroNovedadesModel | null = null;
  @Output() novedadGuardada = new EventEmitter<RegistroNovedadesModel>();
  @Output() cancelar = new EventEmitter<void>();

  mostrarErroresValidacion: boolean = false;
  esEdicion: boolean = false;

  constructor(private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['novedadInicial'] && changes['novedadInicial'].currentValue) {
      this.cargarNovedadInicial(changes['novedadInicial'].currentValue);
    }
    
    if (changes['visible'] && changes['visible'].currentValue === true && this.novedadInicial) {
      this.esEdicion = true;
    } else if (changes['visible'] && changes['visible'].currentValue === true && !this.novedadInicial) {
      this.esEdicion = false;
    }
  }

  ngOnInit() {
    if (this.novedadInicial) {
      this.cargarNovedadInicial(this.novedadInicial);
    }
  }

  private cargarNovedadInicial(novedad: RegistroNovedadesModel): void {
    
    this.novedadActual = { 
      ...this.inicializarNovedad(),
      ...novedad
    };
    
    this.esEdicion = !!novedad.id;
  }

  private inicializarNovedad(): RegistroNovedadesModel {
    return {
      id: undefined,
      novDetalle: '',
      novObservacion: '',
      novEstado: 'A'
    };
  }

  onHideDialog(): void {
    this.visibleChange.emit(false);
    this.resetFormulario();
  }

  guardarNovedad() {
    this.mostrarErroresValidacion = true;

    if (!this.novedadActual.novDetalle.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El detalle de la novedad es obligatorio.' });
      return;
    }
    if (!this.novedadActual.novObservacion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La observación de la novedad es obligatoria.' });
      return;
    }

    this.novedadGuardada.emit(this.novedadActual);
    this.visibleChange.emit(false);
    this.resetFormulario();
  }

  cancelarFormulario(): void {
    this.cancelar.emit();
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Operación cancelada.' });
    this.visibleChange.emit(false);
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.novedadActual = this.inicializarNovedad();
    this.mostrarErroresValidacion = false;
    this.esEdicion = false;
  }
}