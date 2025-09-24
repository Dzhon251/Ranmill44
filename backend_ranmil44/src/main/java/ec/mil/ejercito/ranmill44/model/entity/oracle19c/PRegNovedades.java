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
@Table(name = "RNOVEDADES")
public class PRegNovedades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOV_ID", nullable = false)
    private Long id;


    @Size(max = 100)
    @NotNull
    @Column(name = "NOV_DETALLE", nullable = false, length = 100)
    private String novDetalle;

    @Size(max = 100)
    @NotNull
    @Column(name = "NOV_OBSERVACION", nullable = false)
    private String novObservacion;

    @Size(max = 10)
    @NotNull
    @Column(name = "NOV_ESTADO", nullable = false, length = 10)
    private String novEstado;

    @Size(max = 10)
    @NotNull
    @Column(name = "NOV_USUEDICION", nullable = false, length = 10)
    private String novUsuedicion;

    @NotNull
    @Column(name = "NOV_FECHA_EDICION", nullable = false)
    private LocalDateTime novFechaEdicion;

    // ⚠️ Relacion con PMP GAE-44
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CEDULA", referencedColumnName = "PER_CEDULA")
    private RperMilitargae44 personal;


}