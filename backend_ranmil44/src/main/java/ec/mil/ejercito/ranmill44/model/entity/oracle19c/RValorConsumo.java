package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "RVALORES")
public class RValorConsumo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOV_ID", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Column(name = "RVA_DETALLE", nullable = false, length = 100)
    private String rvaDetalle;

    @NotNull
    @Column(name = "RVA_COSTO", nullable = false)
    private Double rvaCosto;

    @Size(max = 10)
    @NotNull
    @Column(name = "NOV_ESTADO", nullable = false, length = 10)
    private String novEstado;

    @Size(max = 10)
    @NotNull
    @Column(name = "NOV_USUEDICION", nullable = false, length = 10)
    private String novUsuedicion;

    @NotNull
    @Column(name = "NOV_FECHAEDICION", nullable = false)
    private LocalDateTime novFechaedicion;

    // ⚠️ Relacion con PMP- GAE-44
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CEDULA", referencedColumnName = "PER_CEDULA", insertable = false, updatable = false)
    private RperMilitargae44 personal;

}