import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeModule } from '../../../../../shared/modules/prime-module';
import { RegistroValoresModel } from '../../model/registro-valores-model';

@Component({
  selector: 'app-nuevo-registro-valor',
  standalone: true,
  imports: [PrimeModule],
  providers: [MessageService],
  templateUrl: './nuevo-registro-valor.component.html',
  styleUrl: './nuevo-registro-valor.component.scss'
})
export class NuevoRegistroValorComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  valorActual: RegistroValoresModel = this.inicializarValor();

  @Input() valorInicial: RegistroValoresModel | null = null;
  @Output() valorGuardado = new EventEmitter<RegistroValoresModel>();
  @Output() cancelar = new EventEmitter<void>();

  mostrarErroresValidacion: boolean = false;
  esEdicion: boolean = false;

  constructor(private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valorInicial'] && changes['valorInicial'].currentValue) {
      this.cargarvalorInicial(changes['valorInicial'].currentValue);
    }
    
    if (changes['visible'] && changes['visible'].currentValue === true && this.valorInicial) {
      this.esEdicion = true;
    } else if (changes['visible'] && changes['visible'].currentValue === true && !this.valorInicial) {
      this.esEdicion = false;
    }
  }

  ngOnInit() {
    if (this.valorInicial) {
      this.cargarvalorInicial(this.valorInicial);
    }
  }

  private cargarvalorInicial(valor: RegistroValoresModel): void {
    
    this.valorActual = { 
      ...this.inicializarValor(),
      ...valor
    };
    
    this.esEdicion = !!valor.id;
  }

  private inicializarValor(): RegistroValoresModel {
    return {
      id: undefined,
      rvaDetalle: '',
      rvaCosto: 0,
      novEstado: 'A'
    };
  }

  onHideDialog(): void {
    this.visibleChange.emit(false);
    this.resetFormulario();
  }

  guardarValor() {
    this.mostrarErroresValidacion = true;

    if (!this.valorActual.rvaDetalle.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El detalle del valor es obligatorio.' });
      return;
    }
    if (!this.valorActual.rvaCosto) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La observación del valor es obligatorio.' });
      return;
    }

    this.valorGuardado.emit(this.valorActual);
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
    this.valorActual = this.inicializarValor();
    this.mostrarErroresValidacion = false;
    this.esEdicion = false;
  }
}
