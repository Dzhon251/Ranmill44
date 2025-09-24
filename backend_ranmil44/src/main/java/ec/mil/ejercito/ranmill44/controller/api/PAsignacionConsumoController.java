package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.controller.api;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.PersonalDto;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.RasigConsumo;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.AsignacionConsumoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("${app.project.uri}/asignacionConfronta")
public class PAsignacionConsumoController {

    private final AsignacionConsumoService asignacionConsumoService;

    @PostMapping
    public ResponseEntity<String> asignarConsumos(
            @RequestBody AsignacionRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        try {
            String usuario = jwt.getClaimAsString("preferred_username"); // usuario JWT

            asignacionConsumoService.asignarConsumos(
                    request.getPersonalList(),
                    request.getComidas(),
                    usuario,
                    request.getFechaAsignacion() // fecha elegida desde el front
            );

            return ResponseEntity.ok("Consumos asignados correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al asignar consumos: " + e.getMessage());
        }
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<List<RasigConsumo>> obtenerConsumos(@PathVariable String cedula) {
        List<RasigConsumo> consumos = asignacionConsumoService.obtenerConsumosPorCedula(cedula);
        if (consumos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(consumos);
    }

    // DTO interno para el request
    public static class AsignacionRequest {
        private List<PersonalDto> personalList;
        private Map<String, Boolean> comidas;
        private String fechaAsignacion; // formato: yyyy-MM-dd

        public List<PersonalDto> getPersonalList() {
            return personalList;
        }

        public void setPersonalList(List<PersonalDto> personalList) {
            this.personalList = personalList;
        }

        public Map<String, Boolean> getComidas() {
            return comidas;
        }

        public void setComidas(Map<String, Boolean> comidas) {
            this.comidas = comidas;
        }

        public String getFechaAsignacion() {
            return fechaAsignacion;
        }

        public void setFechaAsignacion(String fechaAsignacion) {
            this.fechaAsignacion = fechaAsignacion;
        }
    }
}





