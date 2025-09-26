import { Routes } from '@angular/router';
import { RegistroValoresComponent } from './registro-valores/component/registro-valores.component';
import { RegistroNovedadesComponent } from './registroNovedades/component/registro-novedades.component';
import { ListaPersonalComponent } from './registroPersonal/component/lista-personal/lista-personal.component';


export const AdministracionRoutes: Routes = [

    {
        path: 'registroValores',
        component: RegistroValoresComponent
    },
    {
        path: 'registroNovedades',
        component: RegistroNovedadesComponent
    },
    {
        path: 'registroPersonal',
        component: ListaPersonalComponent
    },

];

export default AdministracionRoutes;
