package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.prayer.Prayer;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

@Repository
public class PrayerConfigDaoImpl implements PrayerConfigDao {

    private MongoTemplate mongoTemplate;

    public PrayerConfigDaoImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Prayer> getPrayerByCompanyIdMonthAndDay(String companyId, int month, int day) {

        ProjectionOperation project = Aggregation.project()
                .andExpression("month(prayers.date)").as("month")
                .andExpression("dayOfMonth(prayers.date)").as("dayOfMonth")
                .and("prayers.date").as("date")
                .and("prayers.fajr").as("fajr")
                .and("prayers.fajrIqama").as("fajrIqama")
                .and("prayers.dhuhr").as("dhuhr")
                .and("prayers.dhuhrIqama").as("dhuhrIqama")
                .and("prayers.asr").as("asr")
                .and("prayers.asrIqama").as("asrIqama")
                .and("prayers.maghrib").as("maghrib")
                .and("prayers.maghribIqama").as("maghribIqama")
                .and("prayers.isha").as("isha")
                .and("prayers.ishaIqama").as("ishaIqama")
                .and("prayers.sunrise").as("sunrise");


        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("prayers"),
                Aggregation.match(Criteria.where("companyId").is(companyId)),
                project,
                Aggregation.match(Criteria.where("month").is(month).and("dayOfMonth").is(day))
        );


        return mongoTemplate
                .aggregate(aggregation, "prayerConfig", Prayer.class)
                .getMappedResults();

    }
}



/*



ProjectionOperation project = Aggregation.project()
                // .and("_id").as("0") // Not sure how to skip field
                .and("configurations.name").as("name")
                .and("configurations.type").as("type")
                .and("configurations.label").as("label")
                .and("configurations.defaultValue").as("defaultValue")
                .and("configurations.description").as("description");

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("configurations"), project);

        return mongoTemplate
                .aggregate(aggregation, "picklist", Configuration.class)
                .getMappedResults();



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