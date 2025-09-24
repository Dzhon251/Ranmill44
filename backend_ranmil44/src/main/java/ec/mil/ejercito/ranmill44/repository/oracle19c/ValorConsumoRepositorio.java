package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.RValorConsumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ValorConsumoRepositorio extends JpaRepository <RValorConsumo, Long> {

    RValorConsumo findByRvaDetalle(String rvaDetalle);

}
