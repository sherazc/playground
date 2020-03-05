package com.lal.sb.repository;

import com.lal.sb.model.CustomerOrder;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<CustomerOrder, Long> {
}
