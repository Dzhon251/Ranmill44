import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { TemplateService } from '../../service/template.service';
import { NgIf } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { UsuarioMenuComponent } from '../usuario-menu/usuario-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgIf,
    MenuComponent,
    UsuarioMenuComponent
],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnDestroy {
  timeout: any = null;

  @ViewChild(UsuarioMenuComponent) menuProfile!: UsuarioMenuComponent;

  @ViewChild('menuContainer') menuContainer!: ElementRef;
  menuProfilePosition: any;
  usuarioMenu: any;

  constructor(public layoutService: TemplateService, public el: ElementRef) { }

  resetOverlay() {
    if (this.layoutService.state.overlayMenuActive) {
      this.layoutService.state.overlayMenuActive = false;
    }
  }



  onMouseEnter() {
    if (!this.layoutService.state.anchored) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.layoutService.state.sidebarActive = true;
    }
  }

  onMouseLeave() {
    if (!this.layoutService.state.anchored) {
      if (!this.timeout) {
        this.timeout = setTimeout(
          () => (this.layoutService.state.sidebarActive = false),
          300
        );
      }
    }
  }

  anchor() {
    this.layoutService.state.anchored = !this.layoutService.state.anchored;
  }

  ngOnDestroy() {
    this.resetOverlay();
  }
}
