package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.picklist.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.stereotype.Repository;

@Repository
public class PicklistDao {

    private MongoTemplate mongoTemplate;

    public PicklistDao(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Configuration> getAllConfiguration() {
/*
db.picklist.aggregate([
    {$unwind : "$configurations"},
    {$project : {
            _id: 0,
            name : "$configurations.name",
            type : "$configurations.type",
            label : "$configurations.label",
            defaultValue : "$configurations.defaultValue",
            description : "$configurations.description"
        }
    }
]);
 */

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

    }

}
