package com.happiness.budtree.domain.mcp;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApiDocsService {

    private final ApiDocsRepository apiDocsRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public void fetchAndSaveSwaggerDocs(String swaggerUrl) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String jsonResponse = restTemplate.getForObject(swaggerUrl, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonResponse);

            // JsonNode.get("가져올 값의 경로") : 없으면 객체 null 처리
            // JsonNode.path("가져올 값의 경로") : 없으면 객체 빈 껍데기 처리

            // DTO 정의들이 모여있는 창고(Components) 확보
            JsonNode components = rootNode.path("components").path("schemas");
            JsonNode pathsNode = rootNode.path("paths");

            apiDocsRepository.deleteAll();

            // [1차 루프] URL 경로(Path) 하나씩 순회
            Iterator<String> pathNames = pathsNode.fieldNames();
            while (pathNames.hasNext()) {
                String path = pathNames.next(); // ex. /survey/save
                JsonNode methodsNode = pathsNode.get(path); // ex. "post" : { ~ }

                // [2차 루프] 해당 경로의 HTTP 메서드(GET, POST 등) 순회
                Iterator<String> methodNames = methodsNode.fieldNames();
                while (methodNames.hasNext()) {
                    String method = methodNames.next(); // ex. post
                    JsonNode operationNode = methodsNode.get(method); // ex. "tags" : [], "summary" : "~", ~~

                    // 파라미터 파싱 (Query, Path)
                    String params = parseParameters(operationNode.path("parameters"));

                    // Request Body DTO 파싱
                    String requestBody = parseRequestBody(operationNode, components);

                    ApiDocs docs = ApiDocs.builder()
                            .path(path)
                            .method(method.toUpperCase())
                            .summary(operationNode.path("summary").asText(""))
                            .description(operationNode.path("description").asText(""))
                            .parameterSpec(params)
                            .requestBodySchema(requestBody)
                            .build();

                    apiDocsRepository.save(docs);
                }
            }
            System.out.println("Swagger 정밀 분석 및 저장 완료!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 파라미터 (Query, Path) 예쁘게 정리
    private String parseParameters(JsonNode paramNode) {
        if (paramNode.isMissingNode() || paramNode.isEmpty()) return null;

        StringBuilder sb = new StringBuilder();
        for (JsonNode param : paramNode) {
            String name = param.path("name").asText();
            String in = param.path("in").asText(); // query, path, header
            boolean required = param.path("required").asBoolean();
            String type = param.path("schema").path("type").asText("string");

            sb.append(String.format("- [%s] %s (%s, 필수:%s)\n", in, name, type, required));
        }
        return sb.toString();
    }

    // Request Body의 DTO 구조 찾아오기
    private String parseRequestBody(JsonNode operationNode, JsonNode components) {
        JsonNode reqBody = operationNode.path("requestBody").path("content").path("application/json").path("schema");

        if (reqBody.isMissingNode()) return null;

        return resolveRef(reqBody.get("$ref").asText(), components);
    }

    // #/components/schemas/LoginRequest -> 실제 JSON 찾기
    private String resolveRef(String ref, JsonNode components) {
        try {
            // "#/components/schemas/LoginRequest" -> "LoginRequest" 추출
            String dtoName = ref.substring(ref.lastIndexOf("/") + 1);
            JsonNode dtoNode = components.path(dtoName);

            // DTO의 속성(properties)만 깔끔하게 리턴
            if (!dtoNode.isMissingNode()) {
                return "DTO명: " + dtoName + "\n" + dtoNode.path("properties").toPrettyString();
            }
        } catch (Exception e) {
            return "구조 참조 실패: " + ref;
        }
        return ref;
    }

    // Gemini에게 보여줄 검색 결과 포맷팅
    @Transactional(readOnly = true)
    public String searchApi(String keyword) {
        List<ApiDocs> results = apiDocsRepository.searchByKeyword(keyword);
        if (results.isEmpty()) return "관련 API 없음";

        StringBuilder sb = new StringBuilder();
        for (ApiDocs doc : results) {
            sb.append(String.format("\n=== [%s] %s ===\n", doc.getMethod(), doc.getPath()));
            sb.append("설명: ").append(doc.getSummary()).append("\n");

            if (doc.getParameterSpec() != null) {
                sb.append("[파라미터 정보]:\n").append(doc.getParameterSpec());
            }

            if (doc.getRequestBodySchema() != null) {
                sb.append("[요청 데이터(DTO) 구조]:\n").append(doc.getRequestBodySchema());
            }
            sb.append("----------------------------------\n");
        }
        return sb.toString();
    }
}