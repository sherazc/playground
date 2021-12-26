package com.sc.cdb.data.dao;

import java.util.List;

import com.mongodb.client.result.UpdateResult;
import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class PrayerConfigDaoImpl implements PrayerConfigDao {

    private MongoTemplate mongoTemplate;

    public PrayerConfigDaoImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Deprecated
    public List<Prayer> getPrayerByCompanyIdMonthAndDay(String companyId, int month, int day) {

        ProjectionOperation projectMonthDate = Aggregation.project()
                .andExpression("month(prayers.date)").as("month")
                .andExpression("dayOfMonth(prayers.date)").as("dayOfMonth");

        ProjectionOperation project = addPrayerProjectionOperation(projectMonthDate);

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("prayers"),
                Aggregation.match(Criteria.where("companyId").is(new ObjectId(companyId))),
                project,
                Aggregation.match(Criteria.where("month").is(month).and("dayOfMonth").is(day))
        );

        return mongoTemplate
                .aggregate(aggregation, "prayerConfig", Prayer.class)
                .getMappedResults();
    }


    public List<Prayer> getPrayerByCompanyId(String companyId) {
        ProjectionOperation project = addPrayerProjectionOperation(Aggregation.project());
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("prayers"),
                Aggregation.match(Criteria.where("companyId").is(new ObjectId(companyId))),
                project);

        return mongoTemplate
                .aggregate(aggregation, "prayerConfig", Prayer.class)
                .getMappedResults();
    }

    @Override
    public boolean updateDst(String companyId, Dst dst) {
        Query query = createCompanyIdQuery(companyId);
        Update update = createDstUpdate(dst);

        UpdateResult updateResult = mongoTemplate.updateMulti(query, update, PrayerConfig.class);

        return updateResult.getModifiedCount() > 0
                // not doing updateResult.getModifiedCount() because mongo do not update if the object is same.
                // && updateResult.getModifiedCount() > 0
                && updateResult.getMatchedCount() > 0;
    }

    private Update createDstUpdate(Dst dst) {
        return new Update()
                .set("dst.enable", dst.getEnable())
                .set("dst.automaticCalculate", dst.getAutomaticCalculate())
                .set("dst.beginMonthDate", dst.getBeginMonthDate())
                .set("dst.endMonthDate", dst.getEndMonthDate());
    }

    private Query createCompanyIdQuery(String companyId) {
        return new Query(Criteria.where("companyId").is(new ObjectId(companyId)));
    }

    private ProjectionOperation addPrayerProjectionOperation(ProjectionOperation projectionOperation) {
        return projectionOperation.and("prayers.date").as("date")
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