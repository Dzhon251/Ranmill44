import { Component, Input } from '@angular/core';
import { ErrorComponent } from '../error/error.component';
import { NgIf } from '@angular/common';
import { ComponenteIconoDeCarga } from '../icono-de-carga/icono-de-carga.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ServicioLogger } from '../../services/logger.service';

@Component({
  selector: 'app-componente-generico',
  standalone: true,
  imports: [ErrorComponent, NgIf, ComponenteIconoDeCarga],
  templateUrl: './generico.component.html',
  styleUrl: './generico.component.scss',
})
export class GenericoComponent {
  @Input() esError: boolean = false;
  @Input() cargando: boolean = true;
  @Input() error: any;
  @Input() backgroundColor: string = 'var(--surface-0)';

  private static unsubscribe$ = new Subject<void>();
  private static logger = new ServicioLogger();

  public static gestionarSuscripcion<T>(
    observable$: Observable<T>,
    nextCallback: (data: T) => void,
    componente?: string,
    mensajeExito?: string,
    mensajeError?: string,
    imprimirResultado: boolean = false
  ) {
    observable$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data) => {
        if (data) {
          nextCallback(data);
          imprimirResultado &&
            mensajeExito &&
            this.logger.info(mensajeExito, componente);
          imprimirResultado && console.log(data);
        }
      },
      error: (error) => {
        this.logger.error(
          mensajeError ? mensajeError : 'Ocurrió un error inesperado',
          error
        );
      },
    });
  }
}
