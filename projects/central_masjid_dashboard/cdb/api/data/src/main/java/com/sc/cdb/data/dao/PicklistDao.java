package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.cc.CentralControlCompany;
import com.sc.cdb.data.model.picklist.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;
import org.springframework.stereotype.Repository;

@Repository
public class PicklistDao {

    private MongoTemplate mongoTemplate;

    public List<Configuration> getAllConfiguration() {

        Aggregation aggregation = Aggregation
                .newAggregation(
                        Aggregation.unwind("configurations")


                        );


        return this.getMongoTemplate()
                .aggregate(
                        aggregation,
                        "picklist",
                        Configuration.class)
                .getMappedResults();

    }

    protected MongoTemplate getMongoTemplate() {
        return mongoTemplate;
    }

    @Autowired
    protected void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


}



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