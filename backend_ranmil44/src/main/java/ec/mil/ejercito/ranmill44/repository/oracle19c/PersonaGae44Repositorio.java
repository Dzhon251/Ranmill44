package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonaGae44Repositorio extends JpaRepository<RperMilitargae44, Long> {
    List<RperMilitargae44> findByPerCedula(String personaCedula);
}
