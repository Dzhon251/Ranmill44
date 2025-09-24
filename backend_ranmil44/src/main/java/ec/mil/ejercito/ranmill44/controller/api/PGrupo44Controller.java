package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.controller.api;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.*;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.Rpersona44Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("${app.project.uri}/personalGae44")
public class PGrupo44Controller {

    private final Rpersona44Service rpersona44Service;

    // Obtener todas las personas
    @GetMapping("/todas")
    public ResponseEntity<List<RperMilitargae44>> obtenerTodas() {
        List<RperMilitargae44> personas = rpersona44Service.listarTodas();
        if (personas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(personas);
    }

    // Obtener persona por cédula
    @GetMapping("/{cedula}")
    public ResponseEntity<RperMilitargae44> obtenerPorCedula(@PathVariable String cedula) {
        return rpersona44Service.buscarPorCedula(cedula)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
