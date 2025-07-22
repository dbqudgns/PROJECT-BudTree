package com.happiness.budtree.util;

import lombok.Builder;

@Builder
public record CursorPaginationRP<T>(
        T lists,
        Long nextCursor,
        boolean hasNext
) {
}
