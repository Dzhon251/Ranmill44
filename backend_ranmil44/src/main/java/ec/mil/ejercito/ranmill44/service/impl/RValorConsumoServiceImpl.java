package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.impl;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.*;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c.*;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.PValorConsumoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RValorConsumoServiceImpl implements PValorConsumoService {

    private final ValorConsumoRepositorio  consumoRepositorio;
    private final ValorConsumoRepositorio valorConsumoRepositorio;

    @Override
    public List<RValorConsumo> listarTodas() {
        return consumoRepositorio.findAll();
    }

    @Override
    public Optional<RValorConsumo> buscarPorId(Long id) {
        return consumoRepositorio.findById(id);
    }


    @Override
    public void eliminar(Long id) {
        RValorConsumo consumo = consumoRepositorio.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No existe valor con ID: " + id));
        consumo.setNovEstado("I");
        consumoRepositorio.save(consumo);
    }

    @Override
    public RValorConsumo registrar(RValorConsumo consumo) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String cedulaUsuario = auth.getName();


        consumo.setNovEstado("A");
        consumo.setNovUsuedicion(cedulaUsuario);
        consumo.setNovFechaedicion(java.time.LocalDateTime.now());
        return valorConsumoRepositorio.save(consumo);
    }
}
