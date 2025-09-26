import { Component, Input } from '@angular/core';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'revenue';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.scss'
})
export class MealCardComponent {
  
  @Input() type: MealType = 'breakfast';
  @Input() value: string = '0';
  @Input() title: string = '';

  get icon(): string {
    switch (this.type) {
      case 'breakfast': return '🍳';
      case 'lunch': return '🍲';
      case 'dinner': return '🥪';
      case 'revenue': return '💰';
      default: return '📊';
    }
  }

  get cssClass(): string {
    return `${this.type}-card`;
  }

}
