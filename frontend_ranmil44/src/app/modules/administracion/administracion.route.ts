import { Routes } from '@angular/router';
import { RegistroValoresComponent } from './registro-valores/component/registro-valores.component';
import { RegistroNovedadesComponent } from './registroNovedades/component/registro-novedades.component';


export const AdministracionRoutes: Routes = [

    {
        path: 'registroValores',
        component: RegistroValoresComponent
    },
    {
        path: 'registroNovedades',
        component: RegistroNovedadesComponent
    },

];

export default AdministracionRoutes;
