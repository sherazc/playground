package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.prayer.Prayer;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PrayerConfigDaoImpl implements PrayerConfigDao {

    private MongoTemplate mongoTemplate;

    public PrayerConfigDaoImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Prayer getPrayerByMonthDay(int month, int dayOfMonth) {
        return null;
    }
}



/*
db.getCollection('prayerConfig').aggregate([
    { $unwind: "$prayers" },
    {
        $match: {
            "companyId": "company1"
        }
    },
    {
        $project: {
            _id: 0,
            date: "$prayers.date",
            dayOfMonth: { $dayOfMonth: "$prayers.date" },
            month: { $month: "$prayers.date" },
            fajr: "$prayers.fajr",
            fajrIqama: "$prayers.fajrIqama",
            dhuhr: "$prayers.dhuhr",
            dhuhrIqama: "$prayers.dhuhrIqama",
            asr: "$prayers.asr",
            asrIqama: "$prayers.asrIqama",
            maghrib: "$prayers.maghrib",
            maghribIqama: "$prayers.maghribIqama",
            isha: "$prayers.isha",
            ishaIqama: "$prayers.ishaIqama",
            sunrise: "$prayers.sunrise"
        }
    },
    {
        $match: {
            "dayOfMonth": 1, "month": 1
        }
    },
    {
        $project: {
            dayOfMonth: 0,
            month: 0,
        }
    },
]);



*/