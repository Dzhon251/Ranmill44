import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { PrimeModule } from '../../../../shared/modules/prime-module';

@Component({
  selector: 'app-registro-confronta',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './registro-confronta.component.html',
  styleUrls: ['./registro-confronta.component.scss']
})
export class RegistroConfrontaComponent implements OnInit, OnDestroy {
  qrResult: string | null = null;
  scanStatus: string = 'No existe QR en cámara';
  private codeReader = new BrowserQRCodeReader();
  private controls: IScannerControls | null = null;

  constructor(private ngZone: NgZone) {}

  async ngOnInit() {
    const videoElement = document.getElementById('preview') as HTMLVideoElement;

    this.controls = await this.codeReader.decodeFromVideoDevice(
      undefined, // usa la cámara por defecto
      videoElement,
      (result, error, controls) => {
        this.ngZone.run(() => {
          if (result) {
            this.qrResult = result.getText();
            this.scanStatus = '✅ QR reconocido';
          } else if (error) {
            this.scanStatus = '🔍 Reconociendo QR...';
          } else {
            this.scanStatus = '📷 No existe QR en cámara';
          }
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.controls) {
      this.controls.stop(); // Detiene la cámara al salir del componente
    }
  }
}
