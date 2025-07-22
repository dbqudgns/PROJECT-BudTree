package com.happiness.budtree.domain.message;

import com.happiness.budtree.domain.chatroom.Chatroom;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long>
{

    @Query("select m from Message m where m.chatroom = :room order by m.createdDate desc, m.messageId desc")
    List<Message> getMessageByRoomID(@Param("room") Chatroom room);

    @Query("SELECT m FROM Message m WHERE m.chatroom.member.username = :username " +
            "AND m.chatroom.roomId = :roomId " +
            "AND (:cursor IS NULL OR m.messageId > :cursor) " +
            "ORDER BY m.createdDate ASC")
    Slice<Message> findMessageByCursor(@Param("roomId") Long roomId,
                                       @Param("cursor") Long cursor,
                                       @Param("username") String username,
                                       Pageable pageable);

}
