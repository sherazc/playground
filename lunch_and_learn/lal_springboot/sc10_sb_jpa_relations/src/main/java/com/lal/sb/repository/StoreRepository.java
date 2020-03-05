package com.lal.sb.repository;

import com.lal.sb.model.Store;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface StoreRepository extends CrudRepository<Store, Long> {

    @Query("select s from Product p " +
            "join Store s on p.store = s " +
            "where p.name = :productName")
    Store findByProductName(String productName);
}
