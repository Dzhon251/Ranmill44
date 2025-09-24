package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "oracle11gEntityManagerFactory",
        transactionManagerRef = "oracle11gTransactionManager",
        basePackages = {"ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle11g"}
)
public class Oracle11gConfiguracion {
    @Bean(name = "oracle11gDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.oracle11g")
    DataSource oracle11gDataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:oracle:thin:@10.20.4.15:1521:DESAR")
                .driverClassName("oracle.jdbc.OracleDriver")
                .username("SIPER")
                .password("PSIPER-1584")
                .build();
    }

    @Bean(name = "oracle11gEntityManagerFactory")
    LocalContainerEntityManagerFactoryBean oracle11gEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("oracle11gDataSource")
            DataSource dataSource
    ) {
        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.default_schema", "SIPER");
        properties.put("hibernate.dialect", "org.hibernate.dialect.OracleDialect");
        return builder
                .dataSource(dataSource)
                .packages("ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model")
                .persistenceUnit("oracle11g")
                .properties(properties)
                .build();
    }

    @Bean(name = "oracle11gTransactionManager")
    PlatformTransactionManager oracle11gTransactionManager(
            @Qualifier("oracle11gEntityManagerFactory")
            EntityManagerFactory entityManagerFactory
    ) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}

