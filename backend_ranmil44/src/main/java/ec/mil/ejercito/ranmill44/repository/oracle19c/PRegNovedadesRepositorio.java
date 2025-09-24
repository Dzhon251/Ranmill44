package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.PRegNovedades;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PRegNovedadesRepositorio extends JpaRepository<PRegNovedades, Long> {

    @Query("SELECT p FROM PRegNovedades p WHERE p.personal.perCedula = :cedula")
    List<PRegNovedades> findByPersonalCedula(@Param("cedula") String cedula);

}
