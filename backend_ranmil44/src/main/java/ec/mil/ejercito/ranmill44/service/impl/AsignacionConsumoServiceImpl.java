package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.impl;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.dto.PersonalDto;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.RasigConsumo;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c.*;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.AsignacionConsumoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.*;

@Service
@Transactional
public class AsignacionConsumoServiceImpl implements AsignacionConsumoService {

    private final AsignacionConsumoRepositorio rasigConsumoRepository;
    private final ValorConsumoRepositorio valorConsumoRepositorio;

    public AsignacionConsumoServiceImpl(AsignacionConsumoRepositorio rasigConsumoRepository,
                                        ValorConsumoRepositorio valorConsumoRepositorio) {
        this.rasigConsumoRepository = rasigConsumoRepository;
        this.valorConsumoRepositorio = valorConsumoRepositorio;
    }

    @Override
    public void asignarConsumos(List<PersonalDto> personalList, Map<String, Boolean> comidas,
                                String usuario, String fechaAsignacion) {

        for (PersonalDto militar : personalList) {
            RasigConsumo consumo = new RasigConsumo();

            // Datos del militar
            consumo.setRasigCedula(militar.getPerCedula());
            consumo.setRasigGrado(militar.getPerGrado());
            consumo.setRrasigNombres(militar.getPerNombres());
            consumo.setRasigApellidos(militar.getPerUnidad());

            // Fecha de asignación desde el front
            consumo.setFechaAsignacion(LocalDate.parse(fechaAsignacion));

            // Comidas y cálculo de valor total
            double totalValor = 0.0;

            if (comidas.getOrDefault("DESAYUNO", false)) {
                consumo.setRregDesayuno("1");
                totalValor += valorConsumoRepositorio.findByRvaDetalle("DESAYUNO").getRvaCosto();
            } else {
                consumo.setRregDesayuno("0");
            }

            if (comidas.getOrDefault("ALMUERZO", false)) {
                consumo.setRregAlmuerzo("1");
                totalValor += valorConsumoRepositorio.findByRvaDetalle("ALMUERZO").getRvaCosto();
            } else {
                consumo.setRregAlmuerzo("0");
            }

            if (comidas.getOrDefault("MERIENDA", false)) {
                consumo.setRregMerienda("1");
                totalValor += valorConsumoRepositorio.findByRvaDetalle("MERIENDA").getRvaCosto();
            } else {
                consumo.setRregMerienda("0");
            }

            consumo.setRregValor(totalValor);

            // Auditoría automática
            consumo.setCedula(militar.getPerCedula());           // cédula para auditoría
            consumo.setNovUsuedicion(usuario);                   // usuario del JWT
            consumo.setNovEstado("A");                           // estado activo
            consumo.setNovFechaedicion(LocalDateTime.now());     // fecha de edición automática

            // Guardar registro
            rasigConsumoRepository.save(consumo);
        }
    }

    @Override
    public List<RasigConsumo> obtenerConsumosPorCedula(String cedula) {
        return rasigConsumoRepository.findByRasigCedula(cedula);
    }

    @Override
    public RasigConsumo obtenerPorCedula(String cedula) {
        return rasigConsumoRepository.findByCedula(cedula)
                .orElseThrow(() -> new RuntimeException("No se encontró registro con la cédula: " + cedula));
    }
}






