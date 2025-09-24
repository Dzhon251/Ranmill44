package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.controller.api;

import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config.QrUtil;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c.RasigConsumo;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.AsignacionConsumoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;

import static ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config.PdfUtil.generarPdfConQr;


@RequiredArgsConstructor
@RestController
@RequestMapping("${app.project.uri}/ticketQr")
public class PTicketQrController {

    private final AsignacionConsumoService service;

    @GetMapping("/pdf/{cedula}")
    public ResponseEntity<byte[]> generarPdfTicket(@PathVariable String cedula) {
        try {
            // Obtener registro
            RasigConsumo registro = service.obtenerPorCedula(cedula);

            // Formatear fecha
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String fecha = registro.getFechaAsignacion().format(formatter);

            // Construir título dinámico
            String titulo = String.format(
                    "Ticket de Consumo de Alimentación del GAE-44 del Sr. %s %s %s C.C %s, del día %s.",
                    registro.getRasigGrado(),
                    registro.getRasigApellidos(),
                    registro.getRrasigNombres(),
                    registro.getRasigCedula(),
                    fecha
            );

            // Construir contenido del QR como texto plano (sin comillas)
            String contenidoQr = String.format(
                    "Unidad: GAE-44\n" +
                    "Fecha: %s\n" +
                    "Código: %d\n" +
                    "Cédula: %s\n" +
                    "Grado: %s\n" +
                    "Apellidos: %s\n" +
                    "Nombres: %s\n" +
                    "Desayuno: %s\n" +
                    "Almuerzo: %s\n" +
                    "Merienda: %s\n" +
                    "Valor Total: %.2f",
                    fecha,
                    registro.getId(),
                    registro.getRasigCedula(),
                    registro.getRasigGrado(),
                    registro.getRasigApellidos(),
                    registro.getRrasigNombres(),
                    registro.getRregDesayuno(),
                    registro.getRregAlmuerzo(),
                    registro.getRregMerienda(),
                    registro.getRregValor()
            );

// Generar QR
            byte[] qrBytes = QrUtil.generateQrPng(contenidoQr, 300);

// Generar PDF
            byte[] pdfBytes = generarPdfConQr(titulo, qrBytes);


            // Devolver PDF
            HttpHeaders headers = new HttpHeaders();



            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("inline")
                    .filename("ticket_" + registro.getRasigCedula() + ".pdf").build());
            headers.setContentLength(pdfBytes.length);

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

