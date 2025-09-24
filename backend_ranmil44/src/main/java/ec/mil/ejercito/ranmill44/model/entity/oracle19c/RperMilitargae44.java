package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "RPER_MILITARGAE44")
public class RperMilitargae44 {
    @Id
    @Size(max = 200)
    @Column(name = "PER_CEDULA", nullable = false, length = 200)
    private String perCedula;

    @Size(max = 200)
    @NotNull
    @Column(name = "PER_GRADO", nullable = false, length = 200)
    private String perGrado;

    @Size(max = 200)
    @NotNull
    @Column(name = "PER_ARMA", nullable = false, length = 200)
    private String perArma;

    @Size(max = 200)
    @NotNull
    @Column(name = "PER_NOMBRES", nullable = false, length = 200)
    private String perNombres;

    @Size(max = 100)
    @NotNull
    @Column(name = "PER_UNIDAD", nullable = false, length = 100)
    private String perUnidad;

    // ⚠️ Relación con novedades
    @OneToMany(mappedBy = "personal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PRegNovedades> novedades;


}