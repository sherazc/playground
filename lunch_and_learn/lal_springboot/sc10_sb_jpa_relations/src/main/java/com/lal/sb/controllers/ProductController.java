package com.lal.sb.controllers;

import java.util.List;

import com.lal.sb.model.Product;
import com.lal.sb.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {
    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/price")
    public ResponseEntity<List<Product>> findProductByPriceLessThanEqual(@RequestParam Double amount) {
        log.debug("Searching for Products less than {}", amount);
        List<Product> products = productRepository.findProductByPriceLessThanEqual(amount);
        return ResponseEntity.ok(products);
    }
}
