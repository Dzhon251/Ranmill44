package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class JwtAutenticacionConfiguracion implements Converter<Jwt, AbstractAuthenticationToken> {
    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    /**
     * Convierte un objeto Jwt en un AbstractAuthenticationToken.
     *
     * @param jwt el token JWT que contiene la información de autenticación.
     * @return una instancia de AbstractAuthenticationToken con las autoridades
     *         extraídas del token JWT.
     */
    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = Stream.concat(
                jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
                extractRealmRoles(jwt).stream()).collect(Collectors.toSet());
        return new JwtAuthenticationToken(jwt, authorities, jwt.getClaim("preferred_username"));
    }

    /**
     * Extrae los roles del realm del token JWT.
     *
     * @param jwt el token JWT que contiene la información de roles.
     * @return una colección de GrantedAuthority que representa los roles extraídos.
     */
    @SuppressWarnings("unchecked")
    private Collection<? extends GrantedAuthority> extractRealmRoles(Jwt jwt) {
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");

        if (resourceAccess == null) {
            return Set.of();
        }

        // Cliente de keycloak
        Map<String, Object> realmClient = (Map<String, Object>) resourceAccess.get("dhp_client_id");
        if (realmClient == null) {
            return Set.of();
        }

        Collection<String> clientRoles;
        if (realmClient == null
                || (clientRoles = (Collection<String>) realmClient.get("roles")) == null) {
            return Set.of();
        }

        return clientRoles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toSet());
    }
}
