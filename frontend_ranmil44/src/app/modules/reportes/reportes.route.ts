import { Routes } from '@angular/router';
import { ReporteIndividualComponent } from './reporteIndividual/component/reporte-individual.component';
import { ReporteMensualComponent } from './reporteMensual/component/reporte-mensual.component';

export const ReportesRoute: Routes = [

    {
        path: 'reporteIndividual',
        component: ReporteIndividualComponent,
    },
    {
        path: 'reporteMensual',
        component: ReporteMensualComponent
    },
];

export default ReportesRoute;
