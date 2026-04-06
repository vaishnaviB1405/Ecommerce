package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.dto.Cart;

public interface CartRepository  extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);
}
