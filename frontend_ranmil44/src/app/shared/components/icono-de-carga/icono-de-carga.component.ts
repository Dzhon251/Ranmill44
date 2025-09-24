import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-loading-icon',
  standalone: true,
  imports: [ProgressSpinnerModule, NgStyle],
  templateUrl: './icono-de-carga.component.html',
  styleUrl: './icono-de-carga.component.scss',
})
export class ComponenteIconoDeCarga {}
