package com.backend.controller;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import com.razorpay.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @PostMapping("/create-order")
    public String createOrder(@RequestParam double amount) throws Exception {

        RazorpayClient client = new RazorpayClient("YOUR_KEY_ID", "YOUR_SECRET");

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // rupees → paise
        options.put("currency", "INR");
        options.put("receipt", "txn_001");

        Order order = client.orders.create(options);

        return order.toString();
    }
}