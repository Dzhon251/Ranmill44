export interface MealData {
  day: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  waste: number;
}

export interface MonthSummary {
  daysInMonth: number;
  dailyData: MealData[];
  totals: {
    breakfast: number;
    lunch: number;
    dinner: number;
    waste: number;
    revenue: number;
  };
  costAnalysis: {
    breakfastCost: number;
    lunchCost: number;
    dinnerCost: number;
    totalCost: number;
    profit: number;
  };
}

export const PRICES = {
  breakfast: 1.60,
  lunch: 3.50,
  dinner: 1.60
};

export const PRODUCTION_COSTS = {
  breakfast: 0.80,  // Costo de producir un desayuno
  lunch: 1.75,      // Costo de producir un almuerzo  
  dinner: 0.70      // Costo de producir una merienda
};