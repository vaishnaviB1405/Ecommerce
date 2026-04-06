package com.backend.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.OtpEntity;
import com.backend.repository.OtpRepository;
import com.backend.services.EmailService;


@RestController
@RequestMapping("/api/otp")
public class OtpController {

    @Autowired
    private OtpRepository otpRepo;

    @Autowired
    private EmailService emailService;

    // ✅ SEND OTP
    @PostMapping("/send-email-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        // generate 6-digit OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        // save OTP in DB
        OtpEntity entity = new OtpEntity();
        entity.setEmail(email);
        entity.setOtp(otp);
        entity.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepo.save(entity);
        
        try {
            emailService.sendOtp(email, otp);
        } catch (Exception e) {
            e.printStackTrace(); // 👈 ADD THIS
            return ResponseEntity.status(500)
                    .body("Email failed: " + e.getMessage());
        }

        // send email
        emailService.sendOtp(email, otp);

        return ResponseEntity.ok("OTP sent successfully");
    }

    // ✅ VERIFY OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String otp = req.get("otp");

        OtpEntity entity = otpRepo.findTopByEmailOrderByIdDesc(email);

        if (entity == null) {
            return ResponseEntity.badRequest().body("No OTP found");
        }

        if (entity.getOtp().equals(otp)
                && entity.getExpiryTime().isAfter(LocalDateTime.now())) {

            return ResponseEntity.ok("OTP Verified");
        }

        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }
}