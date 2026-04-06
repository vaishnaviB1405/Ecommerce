package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.dto.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
