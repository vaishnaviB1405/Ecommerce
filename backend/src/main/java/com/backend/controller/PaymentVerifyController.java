package com.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentVerifyController {

    @PostMapping("/verify")
    public String verify(@RequestBody Map<String, String> data) {

        // For learning, we just accept success response
        // In real app, signature verification is needed

        String paymentId = data.get("razorpay_payment_id");

        if (paymentId != null) {
            return "Payment Successful ✅";
        }

        return "Payment Failed ❌";
    }
}