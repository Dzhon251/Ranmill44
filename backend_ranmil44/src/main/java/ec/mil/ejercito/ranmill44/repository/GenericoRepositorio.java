package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.util.List;

@NoRepositoryBean
public interface GenericoRepositorio<T, ID> extends JpaRepository<T, ID> {
    @Query("SELECT t FROM #{#entityName} t WHERE t.estado = :estado")
    List<T> findAllByEstado(@Param("estado") char estado);
}
