package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.response.UnidadesFT;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.QueryMapping;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c.UnidadesFTRepositorio;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@AllArgsConstructor
@Service
public class UnidadesFTServicio extends BaseServicio<QueryMapping, Integer> {
    private final UnidadesFTRepositorio repositorio;

    // Buscar filtrado por unidadFT
    public List<UnidadesFT> obtenerUnidadesFT(List<String> unidadFT) {
        return this.repositorio.obtenerUnidadesFT(unidadFT);
    }


    @Override
    protected UnidadesFTRepositorio getRepositorio() {
        return this.repositorio;
    }
}