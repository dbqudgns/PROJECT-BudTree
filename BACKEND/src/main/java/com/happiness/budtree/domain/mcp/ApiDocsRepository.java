package com.happiness.budtree.domain.mcp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ApiDocsRepository extends JpaRepository<ApiDocs, Long> {

    // 키워드로 API 검색 (경로, 설명, 요약에서 찾기)
    @Query("SELECT a FROM ApiDocs a WHERE a.path LIKE %:keyword% OR a.summary LIKE %:keyword% OR a.description LIKE %:keyword%")
    List<ApiDocs> searchByKeyword(@Param("keyword") String keyword);
}
