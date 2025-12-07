package com.happiness.budtree.domain.mcp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "api_docs")
public class ApiDocs {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String path;
    private String method;
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String description;

    // [NEW] DTO 구조 (예: {"email":"string", "password":"string"})
    @Column(columnDefinition = "TEXT")
    private String requestBodySchema;

    // [NEW] 쿼리 파라미터 / 패스 변수 (예: type=query, name=page)
    @Column(columnDefinition = "TEXT")
    private String parameterSpec;
}