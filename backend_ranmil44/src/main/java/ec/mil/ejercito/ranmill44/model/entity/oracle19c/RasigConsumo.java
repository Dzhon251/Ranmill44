package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "RASIG_CONSUMO")
public class RasigConsumo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOV_ID", nullable = false)
    private Long id;

    @Size(max = 200)
    @NotNull
    @Column(name = "RASIG_CEDULA", nullable = false, length = 200)
    private String rasigCedula;

    @Size(max = 200)
    @NotNull
    @Column(name = "RASIG_GRADO", nullable = false, length = 200)
    private String rasigGrado;

    @Size(max = 200)
    @NotNull
    @Column(name = "RASIG_APELLIDOS", nullable = false, length = 200)
    private String rasigApellidos;

    @Size(max = 200)
    @NotNull
    @Column(name = "RRASIG_NOMBRES", nullable = false, length = 200)
    private String rrasigNombres;

    @NotNull
    @Column(name = "FECHA_ASIGNACION", nullable = false)
    private LocalDate fechaAsignacion;

    @Size(max = 1)
    @NotNull
    @Column(name = "RREG_DESAYUNO", nullable = false, length = 1)
    private String rregDesayuno;

    @Size(max = 1)
    @NotNull
    @Column(name = "RREG_ALMUERZO", nullable = false, length = 1)
    private String rregAlmuerzo;

    @Size(max = 1)
    @NotNull
    @Column(name = "RREG_MERIENDA", nullable = false, length = 1)
    private String rregMerienda;

    @NotNull
    @Column(name = "RREG_VALOR", nullable = false)
    private Double rregValor;

    @Size(max = 10)
    @NotNull
    @Column(name = "CEDULA", nullable = false, length = 10)
    private String cedula;

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

}