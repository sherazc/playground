package com.sc.repository;

import java.util.List;

import com.sc.modal.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(ObjectId userId);
}
