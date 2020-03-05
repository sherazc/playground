package com.lal.sb.repository;

import java.util.List;

import com.lal.sb.dto.StoreProduct;
import com.lal.sb.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query("select s from Product p " +
            "join Store s on p.store = s " +
            "where lower(p.name) = lower(:productName)")
    Store findByProductName(String productName);

    @Query("select new com.lal.sb.dto.StoreProduct(s.name, p.name) from Store s " +
            "join Product p on s.id = p.store.id")
    List<StoreProduct> findAllStoreProducts();
}
