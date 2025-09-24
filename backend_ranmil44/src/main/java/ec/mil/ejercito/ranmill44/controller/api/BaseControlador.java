package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.controller.api;


import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.impl.IBaseServicio;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

public abstract class BaseControlador<T, ID, S extends IBaseServicio<T, ID>> {
    protected final S servicio;

    public BaseControlador(S servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public String salud() {
        return "hola " + servicio.getClass().getSimpleName();
    }



    @GetMapping("/id")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<T> buscarPorId(@RequestParam ID id) {
        return ResponseEntity.ok(servicio.buscarPorId(id));
    }

    /*@GetMapping("/estado")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<List<T>> buscarPorEstado(@RequestParam char estado) {
        return ResponseEntity.ok(servicio.buscarPorEstado(estado));
    }*/




    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<T> crear(@Valid @RequestBody T entidad) {
        return new ResponseEntity<>(servicio.crear(entidad), HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<T> actualizar(@Valid @RequestBody T entidad) {
        return ResponseEntity.ok(servicio.actualizar(entidad));
    }


}
