package com.sc.cdb.data.dao;

import java.util.List;

import com.mongodb.client.result.UpdateResult;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.CentralControlCompany;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.Fields;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class CentralControlDaoImpl extends BaseDaoImpl<CentralControl> implements CentralControlDao {

  @Override
  public List<CentralControlCompany> findByCompanyUrl(String url) {
    /*
    db.getCollection('centralControl').aggregate([
        {
          $lookup:
             {
                from: "company",
                localField: "companyId",
                foreignField: "_id",
                as: "company"
            }
       },
       { $match : { "company.url" : "inttest" } }
    ]);
     */

    Criteria criteria = Criteria
        .where("company.url")
        .is(url);

    Aggregation aggregation = Aggregation
        .newAggregation(
            DaoConstants.COMPANY_LOOKUP_OPERATION,
            Aggregation.match(criteria));

    return this.getMongoTemplate()
        .aggregate(
            aggregation,
            "centralControl",
            CentralControlCompany.class)
        .getMappedResults();
  }

  /*

companyId = "5da2632ef2a2337a5fd916d3";
configName = "hijri_adjust_days";

db.getCollection('centralControl').aggregate([
   { $match : {"companyId": ObjectId(companyId)} },
   { $unwind : "$customConfigurations"},
   { $project : {
            _id: 0,
            companyId: 1,
            name : "$customConfigurations.name",
            value : "$customConfigurations.value",
        }
    },
    { $match : {"name" : configName} },
]);

   */

  @Override
  public List<CustomConfiguration> findCustomConfigurationByCompanyIdConfigName(ObjectId companyId, String configName) {
    Criteria companyIdCriteria = Criteria
            .where("companyId")
            .is(companyId);

    Criteria configNameCriteria = Criteria
            .where("name")
            .is(configName);


    ProjectionOperation project = Aggregation.project(Fields.from(
            Fields.field("name", "$customConfigurations.name"),
            Fields.field("value", "$customConfigurations.value")));

    Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.match(companyIdCriteria),
            Aggregation.unwind("$customConfigurations"),
            project,
            Aggregation.match(configNameCriteria));

    return this.getMongoTemplate()
            .aggregate(
                    aggregation,
                    "centralControl",
                    CustomConfiguration.class)
            .getMappedResults();
  }

  @Override
  public List<CustomConfiguration> findCustomConfigurationByCompanyId(ObjectId companyId) {
    Criteria companyIdCriteria = Criteria
            .where("companyId")
            .is(companyId);

    ProjectionOperation project = Aggregation.project(Fields.from(
            Fields.field("name", "$customConfigurations.name"),
            Fields.field("value", "$customConfigurations.value")));

    Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.match(companyIdCriteria),
            Aggregation.unwind("$customConfigurations"),
            project);

    return this.getMongoTemplate()
            .aggregate(
                    aggregation,
                    "centralControl",
                    CustomConfiguration.class)
            .getMappedResults();
  }

  @Override
  public boolean isCentralControlExists(String companyId) {
    return this.getMongoTemplate().exists(
        createCompanyIdQuery(companyId),
        CentralControl.class);
  }

  // Do it PrayerDao
  @Deprecated
  // @Override
  public boolean updatePrayerConfig(String companyId, PrayerConfig prayerConfig) {
    Query query = createCompanyIdQuery(companyId);
    Update update = new Update().set("prayerConfig", prayerConfig);
    UpdateResult updateResult = this.getMongoTemplate().updateMulti(query, update, CentralControl.class);
    return updateResult != null && updateResult.getModifiedCount() > 0;
  }

  // TODO remove below method this is just for testing updating complex object
  // https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#db.collection.findAndModify
  // https://stackoverflow.com/questions/47699646/updating-replacing-a-deeply-nested-object-in-mongodb-with-spring-data-mongodb
  public void updateComplexObject() {
    // Query reference
    // https://www.baeldung.com/queries-in-spring-data-mongodb
    Query query = createCompanyIdQuery("company1");
    Update update = new Update().set("jummahs.0.khateeb", "Kateeb 1 Changed again");
    UpdateResult updateResult = this.getMongoTemplate().updateMulti(query, update, CentralControl.class);
    System.out.println(updateResult);
    List<CentralControl> centralControls = this.getMongoTemplate().find(query, CentralControl.class);
    System.out.println(centralControls);

    List<CentralControl> centralControls1 = this.getMongoTemplate().findAll(CentralControl.class);
    centralControls1.forEach(System.out::println);
  }

  private Query createCompanyIdQuery(String companyId) {

    return new Query(Criteria.where("companyId").is(new ObjectId(companyId)));
  }

  @Override
  protected Class getType() {
    return CentralControl.class;
  }
}
