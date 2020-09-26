package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.version.CompanyListVersion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyListVersionRepository extends MongoRepository<CompanyListVersion, String> {
}
