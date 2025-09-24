package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;

import static org.modelmapper.convention.MatchingStrategies.STRICT;

public class AsignadorConfiguracion {
    /**
     * Define un bean de ModelMapper con una estrategia de coincidencia estricta.
     *
     * @return una instancia configurada de ModelMapper.
     */
    @Bean
    ModelMapper modeloAsignador() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(STRICT);
        return modelMapper;
    }

}
