package com.sc.rp.data.system.repository;

import com.sc.rp.data.system.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    boolean existsByName(String name);
}
