package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.response.UnidadesFT;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.QueryMapping;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.GenericoRepositorio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UnidadesFTRepositorio extends GenericoRepositorio<QueryMapping, Integer> {

    // Filtro por lista de unidadFT
    @Query(name = "QUERY_UNIDADES_FT", nativeQuery = true)
    List<UnidadesFT> obtenerUnidadesFT(@Param("unidadFT") List<String> unidadFT);


}