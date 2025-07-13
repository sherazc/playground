package com.sc.redis.service;

import com.sc.redis.dto.Product;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProductService {
  private final Map<Long, Product> productMap = Map.of(
      1L, new Product(1L, "Apple", 0.99),
      2L, new Product(2L, "Banana", 0.59),
      3L, new Product(3L, "Orange", 1.29)
  );

  @Cacheable(value="products")
  public Product getProductById(Long id) {
    System.out.println("Fetching from map (not cache)...");
    simulateDelay();
    return productMap.get(id);
  }

  private void simulateDelay() {
    try {
      Thread.sleep(2000); // simulate slow service
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }
}
