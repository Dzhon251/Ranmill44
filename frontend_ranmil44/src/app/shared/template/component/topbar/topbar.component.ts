import {Component, ElementRef, ViewChild} from '@angular/core';
import {TemplateService} from '../../service/template.service';
import {StyleClassModule} from 'primeng/styleclass';
import {NgClass, NgIf} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import { UsuarioMenuComponent } from "../usuario-menu/usuario-menu.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    StyleClassModule,
    NgClass,
    Ripple,
    UsuarioMenuComponent,
    RouterModule,
],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {

  @ViewChild('menuButton') menuButton!: ElementRef;

  @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;

  constructor(public layoutService: TemplateService, public el: ElementRef) {}

  activeItem!: number;

  get mobileTopbarActive(): boolean {
    return this.layoutService.state.topbarMenuActive;
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }


  onMobileTopbarMenuButtonClick() {
    this.layoutService.onTopbarMenuToggle();
  }

  get menuProfilePosition(): string {
    return this.layoutService.config().menuProfilePosition;
  }
}
