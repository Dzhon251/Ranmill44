import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ImageModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
