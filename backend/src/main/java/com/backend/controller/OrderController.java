package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.Cart;
import com.backend.dto.OrderItem;
import com.backend.dto.Orders;
import com.backend.repository.CartRepository;
import com.backend.repository.OrderItemRepository;
import com.backend.repository.OrdersRepository;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrdersRepository orderRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    // ✅ COD ORDER
    @PostMapping("/checkout/{userId}")
    public String checkout(@PathVariable Long userId) {

        List<Cart> cartItems = cartRepo.findByUserId(userId);

        if (cartItems.isEmpty()) {
            return "Cart is empty";
        }

        double total = 0;

        for (Cart c : cartItems) {
            total += c.getPrice() * c.getQuantity();
        }

        Orders order = new Orders();
        order.setUserId(userId);
        order.setTotalAmount(total);

        order.setStatus("PLACED");
        order.setPaymentStatus("COD");

        Orders savedOrder = orderRepo.save(order);

        for (Cart c : cartItems) {
            OrderItem item = new OrderItem();
            item.setOrderId(savedOrder.getOrderId());
            item.setProductName(c.getProductName());
            item.setPrice(c.getPrice());
            item.setQuantity(c.getQuantity());

            orderItemRepo.save(item);
        }

        cartRepo.deleteAll(cartItems);

        return "COD Order placed successfully ✅";
    }
    
    @PutMapping("/update-status/{orderId}/{status}")
    public String updateOrderStatus(@PathVariable Long orderId, @PathVariable String status) {
        Orders order = orderRepo.findById(orderId).orElse(null);

        if (order == null) {
            return "Order not found";
        }

        order.setStatus(status);
        orderRepo.save(order);

        return "Order status updated to " + status;
    }
    
    @GetMapping("/user/{userId}")
    public List<Orders> getUserOrders(@PathVariable Long userId) {
        return orderRepo.findByUserId(userId);
    }
    
}