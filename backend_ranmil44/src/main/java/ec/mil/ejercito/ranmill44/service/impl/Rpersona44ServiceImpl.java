package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.impl;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.RperMilitargae44;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c.PersonaGae44Repositorio;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.Rpersona44Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class Rpersona44ServiceImpl implements Rpersona44Service {

    private final PersonaGae44Repositorio personaGae44Repositorio;

    @Override
    public List<RperMilitargae44> listarTodas() {
        return personaGae44Repositorio.findAll();
    }

    @Override
    public Optional<RperMilitargae44> buscarPorCedula(String cedula) {
        return personaGae44Repositorio.findByPerCedula(cedula)
                .stream()
                .findFirst();
    }




}

