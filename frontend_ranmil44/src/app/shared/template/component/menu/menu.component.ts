import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MenuitemComponent } from '../menuitem/menuitem.component';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import TemplateComponent from '../../page/template/template.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SidebarModule,
    MenuitemComponent,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  model!: any[];
  showDialog = false;
  pendingRoute: string | null = null;

  constructor(public app: TemplateComponent, private router: Router) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'MENU PRINCIPAL',

        items: [
          {
            path: 'dashboard',
            label: 'Dashboard',
            icon: 'pi pi-user',
            items: [
              {
                label: 'Dashboard RanMill44',
                icon: 'pi pi-users',
                routerLink: 'dashboard/dashboard',
              },
            ]
          },
          {
            path: 'administracion',
            label: 'Administración',
            icon: 'pi pi-user',
            items: [
              {
                label: 'Registro de Novedades',
                icon: 'pi pi-users',
                routerLink: 'administracion/registroNovedades',
              },
              {
                label: 'Registro de Valores',
                icon: 'pi pi-users',
                routerLink: 'administracion/registroValores',
              },
            ]
          },
          {
            path: 'procesos',
            label: 'Procesos',
            icon: 'pi pi-pen-to-square',
            items: [
              {
                label: 'Asignación del Consumo',
                icon: 'pi pi-file',
                routerLink: 'procesos/asignacionConsumo',
              },
              {
                label: 'Registro de confronta',
                icon: 'pi pi-file',
                routerLink: 'procesos/registroConfronta',
              },
              {
                label: 'Generación de Tickets',
                icon: 'pi pi-file',
                routerLink: 'procesos/GeneracionTicket',
              },
            ]
          },
          {
            path: 'reportes',
            label: 'Reportes',
            icon: 'pi pi-file-pdf',
            items: [
              {
                label: 'Reporte Individual',
                icon: 'pi pi-file',
                routerLink: 'reportes/reporteIndividual',
              },
              {
                label: 'Reporte Mensual',
                icon: 'pi pi-file',
                routerLink: 'reportes/reporteMensual',
              },
            ]
          }
        ]
      },
    ];
  }
}
