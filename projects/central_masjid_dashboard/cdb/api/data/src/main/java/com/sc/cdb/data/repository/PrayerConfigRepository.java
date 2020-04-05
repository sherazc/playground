package com.sc.cdb.data.repository;

import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.PrayerConfig;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PrayerConfigRepository extends MongoRepository<PrayerConfig, String> {

    Optional<PrayerConfig> findByCompanyId(ObjectId companyId);

    @Query(value = "{'prayers.365': {$exists: true}}")
    List<PrayerConfig> findValidPrayerConfigs();

    List<PrayerConfig> deleteByCompanyId(ObjectId companyId);
}
