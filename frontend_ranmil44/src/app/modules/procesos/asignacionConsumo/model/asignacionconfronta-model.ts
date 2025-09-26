export interface AsignacionconfrontaModel {
  personalList: PersonalItem[];
  comidas: Comidas;
  fechaAsignacion: string;
}

export interface PersonalItem {
  perCedula: string;
  perGrado: string;
  perArma: string;
  perApellidos: string;
  perNombres: string;
  perUnidad: string;
  perNovedad: string;
  perCorreo: string;
}

export interface Comidas {
  DESAYUNO: boolean;
  ALMUERZO: boolean;
  MERIENDA: boolean;
}