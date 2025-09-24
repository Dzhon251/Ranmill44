package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.controller.api;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.request.PRegNovedadesRequest;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.PRegNovedades;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.PRegNovedadesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("${app.project.uri}/registroNovedades")
public class PRegNovedadesController {

    private final PRegNovedadesService novedadesServicio;

    // =========================
    // Registrar novedad
    // =========================
    @PostMapping
    public ResponseEntity<PRegNovedades> registrar(@RequestBody PRegNovedadesRequest request) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String cedulaUsuario = auth.getName();

        PRegNovedades novedad = new PRegNovedades();
        novedad.setNovDetalle(request.getNovDetalle());
        novedad.setNovObservacion(request.getNovObservacion());

        // Valores automáticos
        novedad.setNovEstado("A");
        novedad.setNovUsuedicion(cedulaUsuario);
        novedad.setNovFechaEdicion(LocalDateTime.now());
        PRegNovedades guardada = novedadesServicio.registrar(novedad);
        return ResponseEntity.ok(guardada);
    }


    // =========================
    // Listar todas las novedades
    // =========================
    @GetMapping
    public ResponseEntity<List<PRegNovedades>> listarTodas() {
        return ResponseEntity.ok(novedadesServicio.listarTodas());
    }

    // =========================
    // Buscar novedad por ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<PRegNovedades> buscarPorId(@PathVariable Long id) {
        return novedadesServicio.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // Actualizar novedad
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<PRegNovedades> actualizar(
            @PathVariable Long id,
            @RequestBody PRegNovedadesRequest request) {

        // Obtener usuario logueado desde el token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String cedulaUsuario = authentication.getName();

        return novedadesServicio.buscarPorId(id)
                .map(existing -> {
                    // Actualizar solo los campos de la novedad
                    existing.setNovDetalle(request.getNovDetalle());
                    existing.setNovObservacion(request.getNovObservacion());

                    // Valores automáticos obligatorios
                    existing.setNovEstado("A"); // Estado automático
                    existing.setNovUsuedicion(cedulaUsuario);
                    existing.setNovFechaEdicion(LocalDateTime.now());

                    PRegNovedades actualizada = novedadesServicio.registrar(existing);
                    return ResponseEntity.ok(actualizada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // Borrado lógico
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        novedadesServicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

