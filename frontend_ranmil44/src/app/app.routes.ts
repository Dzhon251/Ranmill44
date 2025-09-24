import { Routes } from '@angular/router';
import TemplateComponent from './shared/template/page/template/template.component';
import { HomeComponent } from './shared/template/component/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'administracion',
        loadChildren:
          () => import('./modules/administracion/administracion.route')
      },
      {
        path: 'procesos',
        loadChildren:
          () => import('./modules/procesos/procesos.route')
      },
      {
        path: 'reportes',
        loadChildren:
          () => import('./modules/reportes/reportes.route')
      }
    ]
  },
  {
    path: '**', redirectTo: '',
  },
];
