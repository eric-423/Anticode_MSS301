package com.spring.bookingservice.services;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.util.MimeTypeUtils;

import java.io.IOException;
import java.util.List;

public interface AIVertexService {

     Boolean getDescriptionFromImage(VertexAiGeminiChatModel chatModel, byte[] imageBytes, String mimeType);
}
