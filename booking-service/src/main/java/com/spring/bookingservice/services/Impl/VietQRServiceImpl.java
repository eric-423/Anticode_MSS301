package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.dtos.BookingDTO;
import com.spring.bookingservice.dtos.PaymentRequestDTO;
import com.spring.bookingservice.dtos.PaymentResponseDTO;
import com.spring.bookingservice.services.VietQRService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.PaymentData;

import java.util.Date;

@Service
public class VietQRServiceImpl implements VietQRService {

    @Value("${PAYOS_CLIENT_ID}")
    private String clientId;

    @Value("${PAYOS_API_KEY}")
    private String apiKey;

    @Value("${PAYOS_CHECKSUM_KEY}")
    private String checksumKey;

    @Value("${app.payment.base-url:http://localhost:8081}")
    private String baseUrl;

    private final static String SUCCESS_URL = "http://35.247.155.58:8080/booking-service/api/payment/callback/success";
    private final static String CANCEL_URL = "http://35.247.155.58:8080/booking-service/api/payment/callback/cancel";

    @Override
    public PaymentResponseDTO createVietQRPayment(BookingDTO bookingDTO, PaymentRequestDTO paymentRequest) {
        PaymentResponseDTO response = new PaymentResponseDTO();
        
        try {
            PayOS payOS = new PayOS(clientId, apiKey, checksumKey);

            String returnUrl = SUCCESS_URL + "?bookingId=" + bookingDTO.getId();
                
            String cancelUrl = CANCEL_URL + "?bookingId=" + bookingDTO.getId();

            String currentTimeString = String.valueOf(new Date().getTime());
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));

            PaymentData paymentData = PaymentData.builder()
                .orderCode(orderCode)
                .amount((int) bookingDTO.getTotalPrice())
                .description("Thanh toan ve " + bookingDTO.getId())
                .returnUrl(returnUrl)
                .cancelUrl(cancelUrl)
                .build();
            int now = (int) (System.currentTimeMillis() / 1000L);

            int expiredAt = now + 300;

            paymentData.setExpiredAt(expiredAt);
            CheckoutResponseData data = payOS.createPaymentLink(paymentData);

            response.setPaymentUrl(data.getCheckoutUrl());
            response.setPaymentId(data.getPaymentLinkId());
            response.setStatus("SUCCESS");
            response.setMessage("VietQR payment link created successfully. Order Code: " + orderCode);
            
            return response;
            
        } catch (Exception e) {
            response.setStatus("ERROR");
            response.setMessage("VietQR payment creation failed: " + e.getMessage());
            return response;
        }
    }
}
