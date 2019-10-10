package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.auth.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends MongoRepository<Company, String> {
    Optional<Company> findByNameIgnoreCase(String companyName);

    Optional<Company> findByIdIsNotAndNameIgnoreCase(String id, String companyName);

    Optional<Company> findByUrlIgnoreCase(String companyName);

    Optional<Company> findByIdIsNotAndUrlIgnoreCase(String id, String companyName);

    @Query(value = "{active: true}", fields = "{name: 1, url: 1}")
    List<Company> findAllCompanyUrl();
}
