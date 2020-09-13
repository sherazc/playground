package com.sc.rp.data.system.repository;

import java.util.List;

import com.sc.rp.data.system.entity.PricingPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PricingPlanRepository extends JpaRepository<PricingPlan, Long> {
    List<PricingPlan> findByActiveTrueOrderById();
}
