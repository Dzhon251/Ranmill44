package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class McsvDimtDhpApplication {

    public static void main(String[] args) {
        SpringApplication.run(McsvDimtDhpApplication.class, args);
    }

}
