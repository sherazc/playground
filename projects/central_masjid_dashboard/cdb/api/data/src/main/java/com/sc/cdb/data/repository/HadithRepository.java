package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.cc.Hadith;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HadithRepository extends MongoRepository<Hadith, String> {
}
