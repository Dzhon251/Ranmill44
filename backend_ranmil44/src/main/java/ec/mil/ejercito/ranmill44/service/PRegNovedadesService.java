package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.PRegNovedades;

import java.util.List;
import java.util.Optional;

public interface PRegNovedadesService {

    List<PRegNovedades> listarTodas();
    Optional<PRegNovedades> buscarPorId(Long id);
    PRegNovedades registrar(PRegNovedades novedad);
    void eliminar(Long id);
}


