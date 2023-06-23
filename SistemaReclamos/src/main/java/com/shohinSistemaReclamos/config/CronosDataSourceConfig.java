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
import java.util.HashMap;
import java.util.Objects;
import javax.sql.DataSource;

@Configuration
@PropertySource({"classpath:persistence-multiple-db-boot.properties"})
@EnableJpaRepositories(
        basePackages = {"com.shohinSistemaReclamos.repository.primary"},
        entityManagerFactoryRef = "CronosEntityManager",
        transactionManagerRef = "CronosTransactionManager"
)
public class CronosDataSourceConfig {
    @Autowired
    private Environment env;


    @Bean
    public LocalContainerEntityManagerFactoryBean CronosEntityManager() {
        LocalContainerEntityManagerFactoryBean em
                = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(CronosDataSource());
        em.setPackagesToScan(
                "com.shohinSistemaReclamos.entity.primary");

        HibernateJpaVendorAdapter vendorAdapter
                = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto",
                env.getProperty("hibernate.hbm2ddl.auto-primary"));
        properties.put("hibernate.dialect",
                env.getProperty("hibernate.dialect-primary"));
        properties.put("hibernate.show_sql",true);
        em.setJpaPropertyMap(properties);
        return em;
    }


    @Bean
    //@ConfigurationProperties(prefix ="spring.datasource")
    public DataSource CronosDataSource() {

        DriverManagerDataSource dataSource
                = new DriverManagerDataSource();
        dataSource.setDriverClassName(Objects.requireNonNull(env.getProperty("spring.datasource.driver-class-name-primary")));
        System.out.println(env.getProperty("spring.datasource.driver-class-name-primary"));
        dataSource.setUrl(env.getProperty("spring.datasource.url-primary"));
        dataSource.setUsername(env.getProperty("spring.datasource.username-primary"));
        dataSource.setPassword(env.getProperty("spring.datasource.password-primary"));
        System.out.println(env.getProperty("spring.datasource.url-primary") +" --" +env.getProperty("spring.datasource.username-primary") );
        //return DataSourceBuilder.create().build();
        return dataSource;
    }

    @Bean
    public PlatformTransactionManager CronosTransactionManager() {

        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
                CronosEntityManager().getObject());
        return transactionManager;
    }
}
