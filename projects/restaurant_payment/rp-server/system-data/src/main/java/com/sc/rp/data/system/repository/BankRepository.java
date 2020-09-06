package com.sc.rp.data.system.repository;

import com.sc.rp.data.system.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankRepository extends JpaRepository<Bank, Long> {
}
