package com.sc.rp.data.customer.repository;

import com.sc.rp.data.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
