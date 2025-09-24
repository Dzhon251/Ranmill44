import { Injectable, isDevMode } from '@angular/core';
import chalk from 'chalk';

@Injectable({
  providedIn: 'root',
})
export class ServicioLogger {
  // Constructor
  constructor() {}

  // Variables
  private esModoDesarrollador: boolean = isDevMode();

  // Métodos

  error(mensaje: string, contexto?: string, error?: any): void {
    this.mostrarMensaje(chalk.red, 'ERROR', mensaje, contexto, error);
  }

  warn(mensaje: string, contexto?: string): void {
    this.mostrarMensaje(chalk.yellow, 'WARN', mensaje, contexto);
  }

  info(mensaje: string, contexto?: string): void {
    this.mostrarMensaje(chalk.blue, 'INFO', mensaje, contexto);
  }

  log(mensaje: string, contexto?: string): void {
    this.mostrarMensaje(chalk.green, 'LOG', mensaje, contexto);
  }

  private mostrarMensaje(
    color: Function,
    nivel: string,
    mensaje: string,
    contexto?: string,
    error?: any
  ): void {
    const tiempo = new Date().toISOString();
    const mensajeDeContexto = contexto ? chalk.cyan(`${contexto}`) : '';
    const nivelEstilizado = color(`${nivel}`);
    const mensajeDeLog = `${tiempo} ${nivelEstilizado} [frontend-dimt-dhp] ${mensajeDeContexto}: ${mensaje}`;

    if (this.esModoDesarrollador || nivel == 'ERROR') {
      switch (nivel) {
        case 'LOG':
          console.log(mensajeDeLog);
          break;
        case 'ERROR':
          console.error(mensajeDeLog, error ? error : '');
          break;
        case 'WARN':
          console.warn(mensajeDeLog);
          break;
        case 'INFO':
          console.info(mensajeDeLog);
          break;
      }
    }
  }
}
