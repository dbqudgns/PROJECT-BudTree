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

    @Column(columnDefinition = "TEXT")
    private String requestBodySchema;

    @Column(columnDefinition = "TEXT")
    private String parameterSpec;
}