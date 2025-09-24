package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Value("${jasperserver.url}")
    private String JASPER_SERVER_URL;

    @Value("${jasperserver.username}")
    private String JASPER_SERVER_USERNAME;

    @Value("${jasperserver.password}")
    private String JASPER_SERVER_PASSWORD;

    /** Genera reporte en bytes */
    public byte[] generateReport(String reportPath, String format, Map<String, Object> params) throws Exception {

        String url = buildReportUrl(reportPath, format, params.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().toString())));

        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(JASPER_SERVER_USERNAME, JASPER_SERVER_PASSWORD);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_OCTET_STREAM));

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<byte[]> response = new RestTemplate().exchange(url, HttpMethod.GET, entity, byte[].class);

        return response.getBody();
    }

    /** Construye la URL para Jasper */
    public String buildReportUrl(String reportPath, String format, Map<String, String> params) {
        StringBuilder url = new StringBuilder(JASPER_SERVER_URL)
                .append(reportPath)
                .append(".")
                .append(format);

        if (!params.isEmpty()) {
            url.append("?");
            url.append(params.entrySet().stream()
                    .map(e -> URLEncoder.encode(e.getKey(), StandardCharsets.UTF_8) + "=" +
                              URLEncoder.encode(e.getValue(), StandardCharsets.UTF_8))
                    .collect(Collectors.joining("&")));
        }
        return url.toString();
    }
}



