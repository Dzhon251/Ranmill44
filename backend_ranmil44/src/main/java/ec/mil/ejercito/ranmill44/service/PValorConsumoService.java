package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.*;

import java.util.*;

public interface PValorConsumoService {

    List<RValorConsumo> listarTodas();
    Optional<RValorConsumo> buscarPorId(Long id);
    RValorConsumo registrar(RValorConsumo consumo);
    void eliminar(Long id);
}
