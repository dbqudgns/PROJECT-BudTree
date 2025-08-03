package com.happiness.budtree.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.data.host}")
    private String host;

    @Value("${spring.redis.data.port}")
    private int port;

    @Value("${spring.redis.data.database}")
    private int database;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName(host);
        config.setPort(port);
        config.setDatabase(database); //기본적으로 DB 0 사용
        return new LettuceConnectionFactory(config);
    }

    @Bean
    public RedisConnectionFactory redisBlackListConnectionFactory() { // 블랙리스트용 Redis
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName(host);
        config.setPort(port);
        config.setDatabase(1);
        return new LettuceConnectionFactory(config);
    }

    @Bean //AccessToken 및 RefreshToken 저장, 최근 6개 게시물 반환
    public RedisTemplate<String, Object> redisTemplate() {

        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());

        // Redis Key를 문자열로 저장하겠다는 설정
        template.setKeySerializer(new StringRedisSerializer());

        // Java 객체를 JSON 문자열로 변환해서 저장(문자열, 리스트, 객체 다 저장 가능)
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());

        return template;

    }

    @Bean //AccessToken BlackList
    public StringRedisTemplate redisBlackListTemplate() {
        return new StringRedisTemplate(redisBlackListConnectionFactory());
    }

}
