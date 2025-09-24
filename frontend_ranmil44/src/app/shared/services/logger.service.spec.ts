import { TestBed } from '@angular/core/testing';
import { ServicioLogger } from './logger.service';
import chalk from 'chalk';

describe('LoggerService', () => {
  let service: ServicioLogger;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioLogger);
  });

  it('crea el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('Método de log', () => {
    it('llama a console.log con el mensaje correcto', () => {
      spyOn(console, 'log');
      const message = 'Este es un mensaje de log';
      const context = 'Contexto de prueba';
      const timestamp = new Date().toISOString();

      service.log(message, context);

      expect(console.log).toHaveBeenCalledWith(
        `${timestamp} ${chalk.green('LOG')} [frontend-dgth-aspermil] ${chalk.cyan(context)}: ${message}`
      );
    });
  });

  describe('Método de error', () => {
    it('llama a console.error con el mensaje y error correctos', () => {
      spyOn(console, 'error');
      const message = 'Este es un mensaje de error';
      const context = 'Contexto de prueba';
      const error = new Error('Error de prueba');
      const timestamp = new Date().toISOString();

      service.error(message, context, error);

      expect(console.error).toHaveBeenCalledWith(
        `${timestamp} ${chalk.red('ERROR')} [frontend-dgth-aspermil] ${chalk.cyan(context)}: ${message}`,
        error
      );
    });
  });

  describe('Método de warning', () => {
    it('llama a console.warn con el mensaje correcto', () => {
      spyOn(console, 'warn');
      const message = 'Este es una mensaje de warning';
      const context = 'Contexto de prueba';
      const timestamp = new Date().toISOString();

      service.warn(message, context);

      expect(console.warn).toHaveBeenCalledWith(
        `${timestamp} ${chalk.yellow('WARN')} [frontend-dgth-aspermil] ${chalk.cyan(context)}: ${message}`
      );
    });
  });
  describe('Método de info', () => {
    it('llama a console.info con el mensaje correcto', () => {
      spyOn(console, 'info');
      const message = 'Este es un mensaje de información';
      const context = 'Contexto de prueba';
      const timestamp = new Date().toISOString();

      service.info(message, context);

      expect(console.info).toHaveBeenCalledWith(
        `${timestamp} ${chalk.blue('INFO')} [frontend-dgth-aspermil] ${chalk.cyan(context)}: ${message}`
      );
    });
  });
});
