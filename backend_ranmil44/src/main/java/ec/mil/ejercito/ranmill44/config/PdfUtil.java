package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;

import java.io.ByteArrayOutputStream;

public class PdfUtil {

    /**
     * Genera un PDF con un título en color y un QR en el centro
     * @param titulo Título que se mostrará en el PDF
     * @param qrBytes Bytes de la imagen QR
     * @return Byte array del PDF generado
     * @throws Exception
     */
    public static byte[] generarPdfConQr(String titulo, byte[] qrBytes) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // 🔹 Color para el título (ejemplo: azul oscuro)
        Color azulOscuro = new DeviceRgb(0, 51, 102);

        // 🔹 Agregar título con color, negrita y tamaño 14
        Paragraph tituloParrafo = new Paragraph(titulo)
                .setBold()
                .setFontSize(14)
                .setFontColor(azulOscuro);
        document.add(tituloParrafo);

        // 🔹 Agregar QR
        Image qrImage = new Image(ImageDataFactory.create(qrBytes));
        qrImage.setAutoScale(true);
        document.add(qrImage);

        document.close();
        return baos.toByteArray();
    }
}

