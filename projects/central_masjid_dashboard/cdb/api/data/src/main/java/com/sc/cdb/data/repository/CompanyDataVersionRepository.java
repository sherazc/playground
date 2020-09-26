package com.sc.cdb.data.repository;

import java.util.Optional;

import com.sc.cdb.data.model.version.CompanyDataVersion;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyDataVersionRepository extends MongoRepository<CompanyDataVersion, String> {
    Optional<CompanyDataVersion> findByCompanyId(ObjectId companyId);
}
