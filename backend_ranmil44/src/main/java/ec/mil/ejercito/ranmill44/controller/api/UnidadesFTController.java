package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.controller.api;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.response.UnidadesFT;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.UnidadesFTServicio;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RequestMapping("${app.project.uri}/unidadesFt")
@RestController
public class UnidadesFTController {

    private final UnidadesFTServicio servicio;

    @GetMapping("/unidad")
    public ResponseEntity<?> obtenerUnidadesFT(@RequestParam String unidadFT) {
        List<UnidadesFT> unidades = servicio.obtenerUnidadesFT(List.of(unidadFT));
        if (unidades.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Unidad no existe");
        }
        return ResponseEntity.ok(unidades);
    }
}