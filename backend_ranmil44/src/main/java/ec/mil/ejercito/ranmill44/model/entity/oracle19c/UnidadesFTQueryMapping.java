package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.response.UnidadesFT;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.QueryMapping;
import jakarta.persistence.*;



@NamedNativeQuery(
        name = "QUERY_UNIDADES_FT",
        query = UnidadesFTQueryMapping.QUERY_UNIDADES_FT,
        resultSetMapping = "UnidadesFTQueryMapping"
)
@SqlResultSetMapping(
        name = "UnidadesFTQueryMapping",
        classes = {
                @ConstructorResult(
                        targetClass = UnidadesFT.class,
                        columns = {
                                @ColumnResult(name ="CODIGO", type = String.class),
                                @ColumnResult(name ="SIGLAS", type = String.class),
                                @ColumnResult(name ="DESCRIPCION", type = String.class),
                                @ColumnResult(name ="REGION", type = String.class)
                        }
                )


        }
)

@Entity
public class UnidadesFTQueryMapping extends QueryMapping {
    public static final String QUERY_UNIDADES_FT = """
            SELECT
            UNS_CODIGO          AS CODIGO,
            UNS_SIGLAS          AS SIGLAS,
            UNS_DESCRIPCION     AS DESCRIPCION,
            UNS_REGION          AS REGION
            FROM CUNS_UNIDAD_SUGERIDA
            WHERE UNS_DESCRIPCION LIKE ('%' || :unidadFT || '%')
            
            """;




}
