import {Component, inject} from '@angular/core';
import {TemplateService} from '../../service/template.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  layoutService = inject(TemplateService);

  currentYear: number = new Date().getFullYear();
}
