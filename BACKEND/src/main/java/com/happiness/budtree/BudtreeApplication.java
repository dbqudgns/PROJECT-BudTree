package com.happiness.budtree;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync // 비동기 기능 켜기
@SpringBootApplication
public class BudtreeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudtreeApplication.class, args);
	}

	@Bean
	JPAQueryFactory jpaQueryFactory(EntityManager em) {
		return new JPAQueryFactory(em);
	}

}
