package com.sc.cdb.data.repository;

import java.util.Optional;

import com.sc.cdb.data.model.prayer.PrayerConfig;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PrayerConfigRepository extends MongoRepository<PrayerConfig, String> {

    Optional<PrayerConfig> findByCompanyId(ObjectId companyId);
}
