import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { PrimeModule } from '../../../../shared/modules/prime-module';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-confronta',
  standalone: true,
  imports: [PrimeModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './registro-confronta.component.html',
  styleUrls: ['./registro-confronta.component.scss']
})
export class RegistroConfrontaComponent implements OnDestroy {
  qrResult: string | null = null;
  qrData: any = null;
  scanStatus: string = '📷 Cámara apagada';

  private codeReader = new BrowserQRCodeReader();
  private controls: IScannerControls | null = null;

  today: string = new Date().toLocaleDateString('es-ES'); // Fecha actual
  tipoRegistro: string = ''; // Dropdown seleccionado
  scanning = false; // Control de cámara

  constructor(private ngZone: NgZone) {}

  async startScan() {
    this.scanning = true;
    const videoElement = document.getElementById('preview') as HTMLVideoElement;

    this.controls = await this.codeReader.decodeFromVideoDevice(
      undefined,
      videoElement,
      (result, error) => {
        this.ngZone.run(() => {
          if (result) {
            this.qrResult = result.getText();
            this.qrData = this.parseQRData(this.qrResult);
            this.scanStatus = '✅ QR reconocido';

            this.validarRegistro();
          } else if (error) {
            this.scanStatus = '🔍 Buscando QR...';
          }
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.controls) {
      this.controls.stop();
    }
  }

  private parseQRData(raw: string) {
    const lines = raw.split('\n').map(l => l.trim());
    const data: any = {};

    lines.forEach(line => {
      const [key, value] = line.split(':').map(p => p.trim());
      if (key && value) data[key] = value;
    });

    return {
      Unidad: data['Unidad'] || '',
      Fecha: data['Fecha'] || '',
      Cedula: data['Cédula'] || '',
      Grado: data['Grado'] || '',
      Apellidos: data['Apellidos'] || '',
      Nombres: data['Nombres'] || '',
      Desayuno: data['Desayuno'] || '0',
      Almuerzo: data['Almuerzo'] || '0',
      Merienda: data['Merienda'] || '0'
    };
  }

  private validarRegistro() {
    if (!this.tipoRegistro) {
      Swal.fire('⚠️ Atención', 'Seleccione un tipo de registro antes de escanear', 'warning');
      return;
    }

    let tiene = false;
    let mensaje = '';

    switch (this.tipoRegistro) {
      case 'DESAYUNO':
        tiene = this.qrData.Desayuno === '1';
        mensaje = tiene ? 'TIENE DESAYUNO, ¡PUEDE PASAR!' : 'NO TIENE DESAYUNO, ¡NO PUEDE PASAR!';
        break;
      case 'ALMUERZO':
        tiene = this.qrData.Almuerzo === '1';
        mensaje = tiene ? 'TIENE ALMUERZO, ¡PUEDE PASAR!' : 'NO TIENE ALMUERZO, ¡NO PUEDE PASAR!';
        break;
      case 'MERIENDA':
        tiene = this.qrData.Merienda === '1';
        mensaje = tiene ? 'TIENE MERIENDA, ¡PUEDE PASAR!' : 'NO TIENE MERIENDA, ¡NO PUEDE PASAR!';
        break;
    }

    Swal.fire({
      title: this.tipoRegistro,
      text: mensaje,
      icon: tiene ? 'success' : 'error',
      confirmButtonText: 'OK'
    });
  }
}
