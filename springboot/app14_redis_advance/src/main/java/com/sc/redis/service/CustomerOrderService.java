package com.sc.redis.service;

import com.sc.redis.dto.CustomerOrder;
import com.sc.redis.repository.AppDb;
import com.sc.redis.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerOrderService {

  private final AppDb appDb;

  @Cacheable(value="customer-order")
  public CustomerOrder getCustomerOrderById(Long id) {
    System.out.println("Fetching from customer order map (not cache)...");
    CommonUtils.simulateDelay(2000);
    return appDb.customerOrderMap.get(id);
  }

}
