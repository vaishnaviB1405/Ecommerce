package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.dto.OtpEntity;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
    OtpEntity findTopByEmailOrderByIdDesc(String email);
}