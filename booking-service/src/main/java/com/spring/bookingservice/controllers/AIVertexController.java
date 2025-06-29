package com.spring.bookingservice.controllers;

import com.spring.bookingservice.services.Impl.AIVertexServiceImpl;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/ai/vertex")
public class AIVertexController {

    private final VertexAiGeminiChatModel chatModel;
    private final AIVertexServiceImpl aiVertexService;

    public AIVertexController(VertexAiGeminiChatModel chatModel, AIVertexServiceImpl aiVertexService) {
        this.aiVertexService = aiVertexService;
        this.chatModel = chatModel;
    }

    @PostMapping("/check-image")
    public ResponseEntity<String> uploadAndDescribeImage(
            @RequestParam("image") MultipartFile imageFile) {

        if (imageFile.isEmpty()) {
            return ResponseEntity.badRequest().body("Vui lòng chọn một file ảnh để tải lên.");
        }

        try {
            byte[] imageBytes = imageFile.getBytes();
            String mimeType = imageFile.getContentType();

            if (mimeType == null || (!mimeType.equals("image/jpeg") && !mimeType.equals("image/png") && !mimeType.equals("image/webp"))) {
                return ResponseEntity.badRequest().body("Chỉ hỗ trợ file ảnh dạng JPEG, PNG, hoặc WEBP.");
            }

            Boolean result = aiVertexService.getDescriptionFromImage(chatModel, imageBytes, mimeType);
            return ResponseEntity.ok(result.toString());

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xử lý file: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã có lỗi xảy ra từ phía Gemini API: " + e.getMessage());
        }
    }
}
