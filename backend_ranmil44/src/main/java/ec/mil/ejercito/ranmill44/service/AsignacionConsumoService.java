package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.PersonalDto;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.RasigConsumo;

import java.util.*;

public interface AsignacionConsumoService {

    void asignarConsumos(List<PersonalDto> personalList, Map<String, Boolean> comidas, String usuario, String fechaAsignacion);
    List<RasigConsumo> obtenerConsumosPorCedula(String cedula);
    RasigConsumo obtenerPorCedula(String cedula);

}



