package com.sc.rp.app.system.service;

import java.util.List;

import com.sc.rp.data.system.entity.PricingPlan;
import com.sc.rp.data.system.repository.PricingPlanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class PricingPlanServiceImpl implements PricingPlanService {

    private PricingPlanRepository pricingPlanRepository;

    @Override
    public List<PricingPlan> findAllActive() {
        return pricingPlanRepository.findByActiveTrue();
    }
}
