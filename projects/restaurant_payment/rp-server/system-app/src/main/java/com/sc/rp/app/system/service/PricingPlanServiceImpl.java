package com.sc.rp.app.system.service;

import java.util.List;
import java.util.Optional;

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
        return pricingPlanRepository.findByActiveTrueOrderById();
    }

    @Override
    public Optional<PricingPlan> findById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return pricingPlanRepository.findById(id);
    }
}
