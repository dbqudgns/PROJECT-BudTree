package com.happiness.budtree.domain.like;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LikeMapper {

    void saveLike(@Param("member_id") Long member_id);

    int totalLike();

    void cancelLike(@Param("member_id") Long member_id);
}
