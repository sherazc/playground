package com.sc.rp.data.system.repository;

import com.sc.rp.data.system.entity.CompanyUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyUserRepository extends JpaRepository<CompanyUser, Long> {
    boolean existsByEmailIgnoreCase(String email);
}
