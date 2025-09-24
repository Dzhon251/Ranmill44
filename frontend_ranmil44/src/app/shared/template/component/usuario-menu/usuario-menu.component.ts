import { AuthService } from '../../../services/auth.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-usuario-menu',
  standalone: true,
  imports: [CommonModule, MenuModule, ButtonModule, OverlayPanelModule],
  templateUrl: './usuario-menu.component.html',
  styleUrl: './usuario-menu.component.scss',
})
export class UsuarioMenuComponent implements OnInit {

   @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  nombreUsuario: string = '';
  cedula: string = '';
  isAuthenticated = false;
  userPhoto: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.username$.subscribe((username) => {
      this.nombreUsuario = username;
      console.log('nombreUsuario:', username); //solo para consola
    });

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;

    });

    this.authService.cedula$.subscribe((cedula) => {
      this.cedula = cedula;
    });

    this.authService.userPhoto$.subscribe((photo) => {
      this.userPhoto = photo;
      console.log('userPhoto:', photo); //solo para consola
    });
  }

  onProfileClick() {
    // Acción para el perfil
  }

  onSettingsClick() {
    // Acción para la configuración
  }

  async onLogoutClick() {
    await this.authService.logout();
  }

  async onLoginClick() {
    await this.authService.login();
  }


}
