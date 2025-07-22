package com.happiness.budtree.domain.chatroom;

import com.happiness.budtree.domain.member.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {

    @Query("select c from Chatroom c where c.member = :member order by c.createdDate desc, c.roomId desc")
    List<Chatroom> getChatroomByMemberID(@Param("member") Member member);

    @Query("SELECT c FROM Chatroom c " +
            "WHERE c.member.username = :username " +
            "AND (:year = 0 OR FUNCTION('YEAR', c.createdDate) = :year) " +
            "AND (:month = 0 OR FUNCTION('MONTH', c.createdDate) = :month) " +
            "AND (:cursor IS NULL OR c.roomId < :cursor) " +
            "ORDER BY c.createdDate DESC")
    Slice<Chatroom> findChatroomByCursor(@Param("username") String username,
                                          @Param("cursor") Long cursor,
                                          @Param("year") int year,
                                          @Param("month") int month,
                                          Pageable pageable);

}
