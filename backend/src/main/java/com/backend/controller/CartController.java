package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.Cart;
import com.backend.repository.CartRepository;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartRepository cartRepo;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        System.out.println("RECEIVED: " + cart.getProductName()); // ✅ debug
        return cartRepo.save(cart);
    }

    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return cartRepo.findByUserId(userId);
    }
    
 // ✅ UPDATE QUANTITY
    @PutMapping("/update/{cartId}/{quantity}")
    public Cart updateQuantity(@PathVariable Long cartId, @PathVariable int quantity) {
        Cart cart = cartRepo.findById(cartId).orElse(null);

        if (cart != null) {
            cart.setQuantity(quantity);
            return cartRepo.save(cart);
        }

        return null;
    }

    // ✅ DELETE ITEM
    @DeleteMapping("/delete/{cartId}")
    public void deleteItem(@PathVariable Long cartId) {
        cartRepo.deleteById(cartId);
    }
}