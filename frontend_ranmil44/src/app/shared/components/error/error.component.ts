import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  // Atributos de entrada
  @Input() error: any;
}
