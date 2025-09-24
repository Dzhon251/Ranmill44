package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.*;

import java.util.*;

public interface Rpersona44Service {

    List<RperMilitargae44> listarTodas();
    Optional<RperMilitargae44> buscarPorCedula(String cedula);

}
