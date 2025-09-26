import { Injectable } from '@angular/core';
import { MealData, MonthSummary, PRICES, PRODUCTION_COSTS } from '../model/meal-data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private monthData: Map<number, MonthSummary> = new Map();

  generateMonthData(month: number): MonthSummary {
    if (this.monthData.has(month)) {
      return this.monthData.get(month)!;
    }

    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dailyData: MealData[] = [];
    let totalBreakfast = 0, totalLunch = 0, totalDinner = 0, totalWaste = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const breakfast = Math.floor(Math.random() * 20) + 10;
      const lunch = Math.floor(Math.random() * 25) + 15;
      const dinner = Math.floor(Math.random() * 15) + 5;
      const waste = Math.floor(Math.random() * 8) + 1;

      totalBreakfast += breakfast;
      totalLunch += lunch;
      totalDinner += dinner;
      totalWaste += waste;

      dailyData.push({ day, breakfast, lunch, dinner, waste });
    }

    const revenue = (totalBreakfast * PRICES.breakfast) +
      (totalLunch * PRICES.lunch) +
      (totalDinner * PRICES.dinner);

    // Calcular análisis de costos
    const breakfastCost = totalBreakfast * PRODUCTION_COSTS.breakfast;
    const lunchCost = totalLunch * PRODUCTION_COSTS.lunch;
    const dinnerCost = totalDinner * PRODUCTION_COSTS.dinner;
    const totalCost = breakfastCost + lunchCost + dinnerCost;
    const profit = revenue - totalCost;

    const monthSummary: MonthSummary = {
      daysInMonth,
      dailyData,
      totals: {
        breakfast: totalBreakfast,
        lunch: totalLunch,
        dinner: totalDinner,
        waste: totalWaste,
        revenue
      },
      costAnalysis: {
        breakfastCost,
        lunchCost,
        dinnerCost,
        totalCost,
        profit
      }
    };

    this.monthData.set(month, monthSummary);
    return monthSummary;
  }

  getMonths(): { value: number, name: string }[] {
    return [
      { value: 0, name: 'Enero' }, { value: 1, name: 'Febrero' }, { value: 2, name: 'Marzo' },
      { value: 3, name: 'Abril' }, { value: 4, name: 'Mayo' }, { value: 5, name: 'Junio' },
      { value: 6, name: 'Julio' }, { value: 7, name: 'Agosto' }, 
      // { value: 8, name: 'Septiembre' },
      // { value: 9, name: 'Octubre' }, { value: 10, name: 'Noviembre' }, { value: 11, name: 'Diciembre' }
    ];
  }

  calculateWasteByType(totalWaste: number) {
    const wasteBreakfast = Math.floor(totalWaste * 0.3);
    const wasteLunch = Math.floor(totalWaste * 0.5);
    const wasteDinner = totalWaste - wasteBreakfast - wasteLunch;

    return { wasteBreakfast, wasteLunch, wasteDinner };
  }

  // Método para obtener datos de costos semanales
  getWeeklyCosts(dailyData: MealData[]) {
    const weeks = [];
    const weeksInMonth = Math.ceil(dailyData.length / 7);

    for (let week = 0; week < weeksInMonth; week++) {
      const weekData = dailyData.slice(week * 7, (week + 1) * 7);
      const weekBreakfast = weekData.reduce((sum, day) => sum + day.breakfast, 0);
      const weekLunch = weekData.reduce((sum, day) => sum + day.lunch, 0);
      const weekDinner = weekData.reduce((sum, day) => sum + day.dinner, 0);

      weeks.push({
        week: week + 1,
        breakfastCost: weekBreakfast * PRODUCTION_COSTS.breakfast,
        lunchCost: weekLunch * PRODUCTION_COSTS.lunch,
        dinnerCost: weekDinner * PRODUCTION_COSTS.dinner,
        totalCost: (weekBreakfast * PRODUCTION_COSTS.breakfast) +
          (weekLunch * PRODUCTION_COSTS.lunch) +
          (weekDinner * PRODUCTION_COSTS.dinner)
      });
    }

    return weeks;
  }
}