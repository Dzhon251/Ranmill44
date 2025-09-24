package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Clase de configuración para Swagger/OpenAPI.
 * 
 * Esta clase configura la documentación de la API utilizando Swagger/OpenAPI.
 * Define la configuración básica de la API, incluyendo información de contacto,
 * licencia, seguridad y servidores.
 */
@Configuration
@SecurityScheme(name = "BearerAuth", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", scheme = "bearer")
public class SwaggerConfiguracion {
    @Value("${app.gateway-server}")
    private String uriGateway;

    /**
     * Configura la instancia base de OpenAPI.
     * 
     * @return una instancia configurada de OpenAPI.
     */
    @Bean
    OpenAPI baseOpenAPI() {
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
                .info(new Info().title("SISTEMA DE DECLARACIÓN DE HISTORIAL DE PERSONAL DE LA FUERZA TERRESTRE")
                        .description("Sistema de la Dirección de Inteligencia Militar de la FT para el PMP")
                        .version("v1.0")
                        .contact(new Contact()
                                .name("Cbop. Rivas Marco")
                                .email("mvrivasi@ejercito.mil.ec"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://www.apache.org/licenses/LICENSE-2.0.html"))
                        .termsOfService("http://swagger.io/terms/"))
                .externalDocs(new ExternalDocumentation()
                        .description("Endpoints para el Sistema de Declaración de Historial de Personal del PMP")
                        .url("https://springshop.wiki.github.org/docs"))
                .addServersItem(new Server().url(uriGateway));
    }

    /**
     * Configura el GroupedOpenApi para agrupar y personalizar la documentación de la API.
     * 
     * @return una instancia configurada de GroupedOpenApi.
     */
    @Bean
    GroupedOpenApi api() {
        return GroupedOpenApi.builder()
                .group("spring")
                .addOpenApiCustomizer(securityCustomizer())
                .pathsToMatch("/**")
                .build();
    }

    /**
     * Personaliza la configuración de seguridad para OpenAPI.
     * 
     * @return una instancia configurada de OpenApiCustomizer.
     */
    private OpenApiCustomizer securityCustomizer() {
        return openApi -> openApi.addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes("BearerAuth",
                                new io.swagger.v3.oas.models.security.SecurityScheme()
                                        .name("BearerAuth")
                                        .type(io.swagger.v3.oas.models.security.SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
}