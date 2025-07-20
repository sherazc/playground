package com.sc.redis.repository;

import com.sc.redis.dto.CustomerOrder;
import com.sc.redis.dto.Product;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class AppDb {
  public final Map<Long, Product> productMap = Map.of(
      1L, new Product(1L, "Apple", 0.99),
      2L, new Product(2L, "Banana", 0.59),
      3L, new Product(3L, "Orange", 1.29)
  );

  public final Map<Long, CustomerOrder> customerOrderMap = Map.of(
      100L, CustomerOrder.builder()
          .id(100L)
          .userName("Sheraz")
          .products(List.of(productMap.get(1L)))
          .build(),
      200L, CustomerOrder.builder()
          .id(200L)
          .userName("Tariq")
          .products(List.of(productMap.get(2L), productMap.get(3L)))
          .build(),
      300L, CustomerOrder.builder()
          .id(300L)
          .userName("Chaudhry")
          .products(List.of(productMap.get(3L)))
          .build()
  );
}
