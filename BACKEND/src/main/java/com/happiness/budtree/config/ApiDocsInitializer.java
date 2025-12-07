package com.happiness.budtree.config;

import com.happiness.budtree.domain.mcp.ApiDocsService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApiDocsInitializer {
    private final ApiDocsService apiDocsService;

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        // 내 서버의 Swagger 주소 (보통 /v3/api-docs)
        // 주의: 서버가 완전히 뜬 직후 호출해야 함
        System.out.println(">>> API 문서 동기화 시도...");
        // 로컬 테스트 시에는 예외 처리가 필요할 수 있음
        new Thread(() -> {
            try {
                Thread.sleep(2000); // 2초 대기 후 실행
                apiDocsService.fetchAndSaveSwaggerDocs("http://localhost:8080/v3/api-docs");
            } catch (InterruptedException e) { e.printStackTrace(); }
        }).start();
    }
}
