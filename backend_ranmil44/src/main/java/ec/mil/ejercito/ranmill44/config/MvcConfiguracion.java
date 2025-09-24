package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.pattern.PathPatternParser;

/**
 * Clase de configuración para MVC.
 *
 * Esta clase implementa la interfaz WebMvcConfigurer para personalizar la configuración de Spring MVC.
 * En particular, configura el analizador de patrones de ruta para que no sea sensible a mayúsculas y minúsculas.
 */
@Configuration
public class MvcConfiguracion implements WebMvcConfigurer {

    /**
     * Configura el analizador de coincidencia de rutas.
     *
     * Este método sobrescribe el método configurePathMatch de la interfaz WebMvcConfigurer.
     * Configura un PathPatternParser para que no sea sensible a mayúsculas y minúsculas y lo establece en el PathMatchConfigurer.
     *
     * @param configurer el configurador de coincidencia de rutas.
     * @throws IllegalArgumentException si el configurer es nulo.
     */

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        if (configurer == null) {
            throw new IllegalArgumentException("PathMatchConfigurer must not be null");
        }
        PathPatternParser patternParser = new PathPatternParser();
        patternParser.setCaseSensitive(false);
        configurer.setPatternParser(patternParser);
    }


}
