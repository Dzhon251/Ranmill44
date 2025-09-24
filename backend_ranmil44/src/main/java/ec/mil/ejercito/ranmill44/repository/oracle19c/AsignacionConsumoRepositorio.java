package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c;


import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.RasigConsumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface AsignacionConsumoRepositorio extends JpaRepository<RasigConsumo, Long> {

    List<RasigConsumo> findByRasigCedula(String cedula);

    Optional<RasigConsumo> findByCedula(String cedula);


}
