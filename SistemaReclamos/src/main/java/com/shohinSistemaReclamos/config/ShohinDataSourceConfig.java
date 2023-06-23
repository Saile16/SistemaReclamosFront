package com.shohinSistemaReclamos.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Objects;


@Configuration
@PropertySource({"classpath:persistence-multiple-db-boot.properties"})
@EnableJpaRepositories(basePackages = {"com.shohinSistemaReclamos.repository.second"},
        entityManagerFactoryRef = "ShohinEntityManager",
        transactionManagerRef = "ShohinTransactionManager")
public class ShohinDataSourceConfig {
    @Autowired
    private Environment env;

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean ShohinEntityManager() {
        LocalContainerEntityManagerFactoryBean em
                = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(ShohinDataSource());
        em.setPackagesToScan(
                "con.shohinSistemaReclamos.entity.second");

        HibernateJpaVendorAdapter vendorAdapter
                = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto",
                env.getProperty("hibernate.hbm2ddl.auto-secondary"));
        properties.put("hibernate.dialect",
                env.getProperty("hibernate.dialect-secondary"));
        em.setJpaPropertyMap(properties);
        return em;
    }


    @Bean
    @Primary
    //@ConfigurationProperties(prefix ="spring.datasource")
    public DataSource ShohinDataSource() {

        DriverManagerDataSource dataSource
                = new DriverManagerDataSource();
        dataSource.setDriverClassName(Objects.requireNonNull(env.getProperty("spring.datasource.driver-class-name-secondary")));
        dataSource.setUrl(env.getProperty("spring.datasource.url-secondary"));
        dataSource.setUsername(env.getProperty("spring.datasource.username-secondary"));
        dataSource.setPassword(env.getProperty("spring.datasource.password-secondary"));
        //return DataSourceBuilder.create().build();
        return dataSource;
    }


    @Bean
    @Primary
    public PlatformTransactionManager ShohinTransactionManager() {

        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
                ShohinEntityManager().getObject());
        return transactionManager;
    }
}
