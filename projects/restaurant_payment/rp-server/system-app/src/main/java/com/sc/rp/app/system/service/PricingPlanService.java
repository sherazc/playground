package com.sc.rp.app.system.service;

import java.util.List;

import com.sc.rp.data.system.entity.PricingPlan;

public interface PricingPlanService {
    List<PricingPlan> findAllActive();
}
