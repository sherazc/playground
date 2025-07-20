package com.sc.redis.controller;

import com.sc.redis.dto.CustomerOrder;
import com.sc.redis.service.CustomerOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer-order")
@RequiredArgsConstructor
public class CustomerOrderController {

  private final CustomerOrderService customerOrderService;

  @GetMapping("/{id}")
  public CustomerOrder getProduct(@PathVariable Long id) {
    return customerOrderService.getCustomerOrderById(id);
  }
}