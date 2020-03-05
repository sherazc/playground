package com.lal.sb.controllers;

import com.lal.sb.model.Store;
import com.lal.sb.repository.StoreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/store")
public class StoreController {

    private StoreRepository storeRepository;

    public StoreController(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @GetMapping("/product/name/{productName}")
    public ResponseEntity<Store> findByProductName(@PathVariable String productName) {
        Store store = storeRepository.findByProductName(productName);
        return ResponseEntity.ok(store);
    }
}
