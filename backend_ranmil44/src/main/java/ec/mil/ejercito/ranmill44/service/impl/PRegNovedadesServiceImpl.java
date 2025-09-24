package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.impl;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.PRegNovedades;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c.*;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.PRegNovedadesService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PRegNovedadesServiceImpl implements PRegNovedadesService {

    private final PRegNovedadesRepositorio novedadesRepositorio;

    @Override
    public List<PRegNovedades> listarTodas() {
        return novedadesRepositorio.findAll();
    }

    @Override
    public Optional<PRegNovedades> buscarPorId(Long id) {
        return novedadesRepositorio.findById(id);
    }


    @Override
    public void eliminar(Long id) {
        PRegNovedades novedad = novedadesRepositorio.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No existe novedad con ID: " + id));
        novedad.setNovEstado("I"); // Borrado lógico
        novedadesRepositorio.save(novedad);
    }

    @Override
    public PRegNovedades registrar(PRegNovedades novedad) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String cedulaUsuario = auth.getName();


        novedad.setNovEstado("A");
        novedad.setNovUsuedicion(cedulaUsuario);
        novedad.setNovFechaEdicion(java.time.LocalDateTime.now());

        return novedadesRepositorio.save(novedad);
    }


}

