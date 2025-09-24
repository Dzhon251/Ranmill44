import { RegistroNovedadesModel } from "../../../administracion/registroNovedades/model/registro-novedades-model";

export interface AsignacionConsumoModel {
    perCedula: string,
    perGrado: string,
    perArma: string,
    perNombres: string,
    perUnidad: string,
    novedades: [],
    novedadSeleccionada?: RegistroNovedadesModel;
    valorDesayuno?: boolean;
    valorAlmuerzo?: boolean;
    valorMerienda?: boolean;
}
