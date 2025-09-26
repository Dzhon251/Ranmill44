import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PrimeModule } from '../../../../../shared/modules/prime-module';
import { MessageService } from 'primeng/api';
import { RegistroPersonalModel } from '../../model/registro-personal-model';

@Component({
  selector: 'app-nuevo-personal',
  standalone: true,
  imports: [PrimeModule],
  providers: [MessageService],
  templateUrl: './nuevo-personal.component.html',
  styleUrl: './nuevo-personal.component.scss'
})
export class NuevoPersonalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  personaActual: RegistroPersonalModel = this.inicializarPersona();

  @Input() personaInicial: RegistroPersonalModel | null = null;
  @Output() personaGuardada = new EventEmitter<RegistroPersonalModel>();
  @Output() cancelar = new EventEmitter<void>();

  mostrarErroresValidacion: boolean = false;
  esEdicion: boolean = false;

  // Valor por defecto para la unidad que se enviará al backend
  private readonly UNIDAD_POR_DEFECTO = 'G.A.E 44';

  constructor(private messageService: MessageService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personaInicial']) {
      if (changes['personaInicial'].currentValue) {
        this.cargarPersonaInicial(changes['personaInicial'].currentValue);
        this.esEdicion = true;
      } else {
        // Cuando personaInicial es null, es un nuevo registro
        this.esEdicion = false;
        this.personaActual = this.inicializarPersona();
      }
    }

    if (changes['visible'] && changes['visible'].currentValue === true) {
      // Reinicializar solo si es nuevo registro
      if (!this.personaInicial) {
        this.personaActual = this.inicializarPersona();
      }
    }
  }



  ngOnInit() {
    if (this.personaInicial) {
      this.cargarPersonaInicial(this.personaInicial);
    }
  }

  private cargarPersonaInicial(persona: RegistroPersonalModel): void {
    this.personaActual = {
      ...this.inicializarPersona(),
      ...persona
    };
    this.esEdicion = !!persona.perCedula;
  }

  private inicializarPersona(): RegistroPersonalModel {
    return {
      perCedula: '',
      perGrado: '',
      perArma: '',
      perApellidos: '',
      perNombres: '',
      perCorreo: '',
      perUnidad: this.UNIDAD_POR_DEFECTO, // Establecer valor por defecto aquí
      novedades: []
    };
  }

  onHideDialog(): void {
    this.visibleChange.emit(false);
    this.resetFormulario();
  }

  validarFormulario(): boolean {
    const p = this.personaActual;

    // Validar campos requeridos
    if (!p.perCedula || p.perCedula.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'El campo Cédula es obligatorio.'
      });
      return false;
    }

    if (!p.perGrado || p.perGrado.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'El campo Grado es obligatorio.'
      });
      return false;
    }

    if (!p.perNombres || p.perNombres.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'El campo Nombres es obligatorio.'
      });
      return false;
    }

    if (!p.perApellidos || p.perApellidos.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'El campo Apellidos es obligatorio.'
      });
      return false;
    }

    if (!p.perCorreo || p.perCorreo.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'El campo Correo es obligatorio.'
      });
      return false;
    }

    // Validar formato de correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.perCorreo)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'El formato del correo electrónico no es válido.'
      });
      return false;
    }

    return true;
  }

  guardarPersona() {
    this.mostrarErroresValidacion = true;

    if (!this.validarFormulario()) {
      return;
    }

    // Crear objeto a guardar con valores limpios
    const personaAGuardar: RegistroPersonalModel = {
      perCedula: this.personaActual.perCedula.trim(),
      perGrado: this.personaActual.perGrado.trim(),
      perArma: this.personaActual.perArma.trim(),
      perApellidos: this.personaActual.perApellidos.trim(),
      perNombres: this.personaActual.perNombres.trim(),
      perCorreo: this.personaActual.perCorreo.trim(),
      perUnidad: this.UNIDAD_POR_DEFECTO,
      novedades: this.personaActual.novedades || []
    };

    this.personaGuardada.emit(personaAGuardar);
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
    this.personaActual = this.inicializarPersona();
    this.mostrarErroresValidacion = false;
    this.esEdicion = false;
  }
}
