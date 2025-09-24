import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsuarioMenuComponent } from './shared/template/component/usuario-menu/usuario-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  template: '<router-outlet />',
})
export class ComponenteApp implements OnInit {
  title = 'front-dim-dhp';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   import('flowbite').then((module) => {
    //     module.initFlowbite();
    //   });
    // }
  }
}
