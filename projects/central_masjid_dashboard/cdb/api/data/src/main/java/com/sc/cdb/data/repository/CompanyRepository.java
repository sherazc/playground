package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CompanyRepository extends MongoRepository<Company, String> {
    Optional<Company> findByNameIgnoreCase(String companyName);
}
