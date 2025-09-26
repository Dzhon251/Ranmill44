import {Routes} from '@angular/router';
import { AsignacionConsumoComponent } from './asignacionConsumo/component/asignacion-consumo.component';
import { RegistroConfrontaComponent } from './registroConfronta/component/registro-confronta.component';
import { GeneracionTicketsComponent } from './generacionTickets/component/generacion-tickets.component';

export const ProcesosRoute: Routes = [

    {
        path: 'asignacionConsumo',
        component: AsignacionConsumoComponent
    },
    {
        path: 'registroConfronta',
        component: RegistroConfrontaComponent
    },
    {
        path: 'GeneracionTicket',
        component: GeneracionTicketsComponent
    },
    
];

export default ProcesosRoute;
