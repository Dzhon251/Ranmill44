import { Component } from '@angular/core';
import {TemplateService} from '../../service/template.service';
import {SidebarModule} from 'primeng/sidebar';

@Component({
  selector: 'app-rightmenu',
  standalone: true,
  imports: [
    SidebarModule
  ],
  templateUrl: './rightmenu.component.html'
})
export class RightmenuComponent {

  constructor(public layoutService: TemplateService) { }

  get rightMenuActive(): boolean {
    return this.layoutService.state.rightMenuActive;
  }

  set rightMenuActive(_val: boolean) {
    this.layoutService.state.rightMenuActive = _val;
  }
}
