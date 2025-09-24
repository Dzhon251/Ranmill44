package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.request;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.RperMilitargae44;
import lombok.*;

import java.util.*;

@Getter
@Setter
public class PConsumoRequest {

    private List<RperMilitargae44> personalList;
    private Map<String, Boolean> comidas;
}
