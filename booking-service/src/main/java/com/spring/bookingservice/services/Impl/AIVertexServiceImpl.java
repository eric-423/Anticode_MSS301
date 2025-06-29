package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.services.AIVertexService;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeTypeUtils;

import java.io.IOException;
import java.util.List;

@Service
public class AIVertexServiceImpl implements AIVertexService {

    @Override
    public Boolean getDescriptionFromImage(VertexAiGeminiChatModel chatModel, byte[] imageBytes, String mimeType) {

        Resource resource = new ByteArrayResource(imageBytes);

        UserMessage userMessage = UserMessage.builder()
                .text("Hãy xem ngày hết hạn của thẻ sinh viên trên, và so sánh ngày hôm nay với ngày hết hạn trong hôm nay xem sinh viên đã hết hạn chưa. Chỉ trả ra true nếu chưa hết hạn và ngược lại là false")
                .media(List.of(new Media(MimeTypeUtils.parseMimeType(mimeType), resource)))
                .build();

        ChatResponse response = chatModel.call(new Prompt(List.of(userMessage)));
        String result = response.getResult().getOutput().getText();

        if(result.equals("true")){
            return true;
        }
        return false;
    }
}
