import { Component } from '@angular/core';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PrimeModule } from "../../../../shared/modules/prime-module";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-reporte-mensual',
  standalone: true,
  imports: [PrimeModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './reporte-mensual.component.html',
  styleUrl: './reporte-mensual.component.scss'
})
export class ReporteMensualComponent {

}
