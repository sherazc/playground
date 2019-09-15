package com.sc.cdb.data.repository;

import java.util.Optional;

import com.sc.cdb.data.model.cc.CentralControl;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CentralControlRepository extends MongoRepository<CentralControl, String> {
    Optional<CentralControl> findByCompanyId(String companyId);
}
