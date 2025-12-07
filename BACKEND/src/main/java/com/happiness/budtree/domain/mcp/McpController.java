package com.happiness.budtree.domain.mcp;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mcp")
@RequiredArgsConstructor
public class McpController {
    private final ApiDocsService apiDocsService;

    @GetMapping("/search")
    public String search(@RequestParam String keyword) {
        return apiDocsService.searchApi(keyword);
    }
}