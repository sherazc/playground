package com.lal.sb.repository;

import java.util.List;

import com.lal.sb.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductByPriceLessThanEqual(Double price);
}
