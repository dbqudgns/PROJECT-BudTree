package com.happiness.budtree.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisUtil {

    //Redis에 접근하기 위한 Redis 템플릿
    private final RedisTemplate<String, Object> redisTemplate;
    private final StringRedisTemplate redisBlackListTemplate;

    //지정된 키(key)에 해당하는 데이터를 Redis에서 가져오는 메서드
    public Object getData(String key) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    //지정된 키(key)에 값을 저장하는 메서드
    public void setData(String key, String value) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    /** 지정된 키(key)에 값을 저장하고,
     * 지정된 시간(expiredMs) 후에 데이터가 만료되도록 설정하는 메서드
      */
    public void setDataExpire(String key, Object value, Long expired) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(expired);
        valueOperations.set(key, value, expireDuration);
    }

    //지정된 키(key)에 해당하는 데이터를 Redis에서 삭제하는 메서드
    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    //로그아웃 된 사용자의 Access Token 블랙리스트 설정 메서드
    public void setBlackList(String key, String value, Long expired) {
        ValueOperations<String, String> valueOperations = redisBlackListTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(expired);
        valueOperations.set(key, value, expireDuration);
    }

    public String getBlackListData(String key) {
        ValueOperations<String, String> valueOperations = redisBlackListTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void deleteBlackList(String key) {
        redisBlackListTemplate.delete(key);
    }



}
