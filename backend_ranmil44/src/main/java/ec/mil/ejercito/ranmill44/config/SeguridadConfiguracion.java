package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.*;

import java.util.Arrays;

/**
 * Clase de configuración de seguridad.
 * 
 * Esta clase configura la seguridad de la aplicación utilizando Spring Security.
 * Define las reglas de autorización, la configuración de CORS y la gestión de sesiones.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SeguridadConfiguracion {
    private final JwtAutenticacionConfiguracion jwtAuthConverter;

    /**
     * Configura la cadena de filtros de seguridad.
     * 
     * @param http el objeto HttpSecurity para configurar la seguridad HTTP.
     * @return una instancia configurada de SecurityFilterChain.
     * @throws Exception si ocurre un error durante la configuración.
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(
                authorize -> authorize
                    .requestMatchers(
                        "/mcsv-dimt-dhp/swagger-ui.html",
                        "/mcsv-dimt-dhp/v3/api-docs/*",
                        "/mcsv-dimt-dhp/swagger-ui/*",
                        "/mcsv-dimt-dhp/v3/api-docs",
                        ///@TODO BORRAR SON RUTAS DE DESARROLLO
                        "/mcsv-dimt-dhp-dev/v3/api-docs/*",
                        "/mcsv-dimt-dhp-dev/swagger-ui/*",
                        "/mcsv-dimt-dhp-dev/swagger-ui.html",
                        "/mcsv-dimt-dhp-dev/v3/api-docs",
                        "/actuator/health"
                    )
                .permitAll()
                .requestMatchers("/dev/dimt/dhp/declaracion_historial_personal/api/**")
                .hasRole("ADMIN")
                .requestMatchers("/dimt/dhp/declaracion_historial_personal/api/**")
                .hasRole("ADMIN")

                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(
                oauth2 -> oauth2
                    .jwt(
                        jwt -> jwt
                            .jwtAuthenticationConverter(jwtAuthConverter)
                    )
            )
            .sessionManagement(
                sm -> sm
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));
        return http.build();
    }

    /**
     * Configura la fuente de configuración de CORS.
     * 
     * @return una instancia configurada de CorsConfigurationSource.
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList(
            "Origin",
            "Access-Control-Allow-Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "Origin, Accept",
            "X-Requested-With",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));
        configuration.setExposedHeaders(Arrays.asList(
            "Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials"
        ));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}