package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.config;


import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import jakarta.persistence.EntityManagerFactory;

/**
 * Clase de configuración para la base de datos Oracle 19c.
 *
 * Esta clase configura el DataSource, EntityManagerFactory y TransactionManager
 * para conectarse y gestionar transacciones con una base de datos Oracle 19c.
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "oracle19cEntityManagerFactory",
        transactionManagerRef = "oracle19cTransactionManager",
        basePackages = "ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.oracle19c"
)
@EntityScan("ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity")
public class Oracle19cConfiguracion {

    /**
     * Define el DataSource para la base de datos Oracle 19c.
     *
     * @return una instancia configurada de DataSource.
     */
    @Primary
    @Bean(name = "oracle19cDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.oracle19c")
    public DataSource oracle19cDataSource() {
        return DataSourceBuilder.create().build();
    }

    /**
     * Define el EntityManagerFactory para la base de datos Oracle 19c.
     *
     * @param builder el constructor de EntityManagerFactory.
     * @param dataSource el DataSource configurado para Oracle 19c.
     * @return una instancia configurada de LocalContainerEntityManagerFactoryBean.
     */
    @Primary
    @Bean(name = "oracle19cEntityManagerFactory")
    @ConfigurationProperties(prefix = "spring.jpa.oracle19c")
    public LocalContainerEntityManagerFactoryBean oracle19cEntityManagerFactory(EntityManagerFactoryBuilder builder,
                                                                                @Qualifier("oracle19cDataSource") DataSource dataSource) {
        // @TODO: Borrar esto solo es para desarrollar la base de datos
        LocalContainerEntityManagerFactoryBean em = builder
                .dataSource(dataSource)
                .packages("ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.model.entity.oracle19c")
                .persistenceUnit("oracle19c")
                .build();
        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        ((HibernateJpaVendorAdapter) vendorAdapter).setDatabase(Database.ORACLE);
        em.setJpaVendorAdapter(vendorAdapter);
        return em;
    }

    /**
     * Define el TransactionManager para la base de datos Oracle 19c.
     *
     * @param entityManagerFactory el EntityManagerFactory configurado para Oracle 19c.
     * @return una instancia configurada de PlatformTransactionManager.
     */
    @Primary
    @Bean(name = "oracle19cTransactionManager")
    public PlatformTransactionManager oracle19cTransactionManager(
            @Qualifier("oracle19cEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}