package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyRepository extends MongoRepository<Company, String> {
}
