package org.vigi;

import com.nurkiewicz.jdbcrepository.sql.PostgreSqlGenerator;
import com.nurkiewicz.jdbcrepository.sql.SqlGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.hateoas.config.EnableEntityLinks;
import org.springframework.web.client.RestTemplate;

import javax.sql.DataSource;

@SpringBootApplication
@EnableEntityLinks
public class Application extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}

	@Bean
	RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	@Primary
	@ConfigurationProperties(prefix = "spring.datasource")
	@Profile("prod")
	DataSource dataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	@Profile("prod")
	SqlGenerator postgreSqlGenerator() {
		return new PostgreSqlGenerator();
	}

	@Bean
	@Profile("!prod")
	SqlGenerator sqlGenerator() {
		return new SqlGenerator();
	}
}