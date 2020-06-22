package com.sc.java9.service;

import java.util.List;

import com.sc.java9.entity.Product;

public interface ProductService {
    List<Product> findAllProducts();

    Product saveProduct(Product product);
}
