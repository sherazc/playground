package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.picklist.Picklist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PicklistRepository extends MongoRepository<Picklist, String> {
}
