package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.controller.api;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.request.*;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.*;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.PValorConsumoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("${app.project.uri}/valorConsumo")
public class PValorConsumoController {

    private final PValorConsumoService valorServicio;

    // =========================
    // Registrar valor consumo
    // =========================
    @PostMapping
    public ResponseEntity<RValorConsumo> registrar(@RequestBody PValorConsumoRequest request) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String cedulaUsuario = auth.getName();

        RValorConsumo consumo = new RValorConsumo();
        consumo.setRvaDetalle(request.getRvaDetalle());
        consumo.setRvaCosto(request.getRvaCosto());
        consumo.setNovEstado("A");
        consumo.setNovUsuedicion(cedulaUsuario);
        consumo.setNovFechaedicion(LocalDateTime.now());
        RValorConsumo guardada = valorServicio.registrar(consumo);
        return ResponseEntity.ok(guardada);
    }


    // =========================
    // Listar todas las novedades
    // =========================
    @GetMapping
    public ResponseEntity<List<RValorConsumo>> listarTodas() {
        return ResponseEntity.ok(valorServicio.listarTodas());
    }

    // =========================
    // Buscar novedad por ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<RValorConsumo> buscarPorId(@PathVariable Long id) {
        return valorServicio.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // Actualizar novedad
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<RValorConsumo> actualizar(
            @PathVariable Long id,
            @RequestBody PValorConsumoRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String cedulaUsuario = authentication.getName();

        return valorServicio.buscarPorId(id)
                .map(existing -> {
                    // Actualizar solo los campos de la novedad
                    existing.setRvaDetalle(request.getRvaDetalle());
                    existing.setRvaCosto(request.getRvaCosto());

                    // Valores automáticos obligatorios
                    existing.setNovEstado("A"); // Estado automático
                    existing.setNovUsuedicion(cedulaUsuario);
                    existing.setNovFechaedicion(LocalDateTime.now());

                    RValorConsumo actualizada = valorServicio.registrar(existing);
                    return ResponseEntity.ok(actualizada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // Borrado lógico
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        valorServicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

