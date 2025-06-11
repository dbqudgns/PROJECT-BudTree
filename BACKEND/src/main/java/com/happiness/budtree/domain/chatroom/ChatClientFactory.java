package com.happiness.budtree.domain.chatroom;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatClientFactory {

    private final ChatClient.Builder builder;

    public ChatClient chatClient(String name) {

        String systemMessage = String.format("""
                User name is %s and your name is '버디'. You should follow the following rules.:
                            1. Speak informally to me.
                            2. You talk to a depressed person, so you should support them with an empathetic tone and ask questions that fit the patient's current situation.
                            3. Refer to details when sending an existing conversation record, but do not ask the same question.""", name);

        return  builder.defaultSystem(systemMessage).build();
    }

}
