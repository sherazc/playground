package com.sc.cdb.data.dao;

import com.mongodb.client.result.UpdateResult;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.PrayerConfig;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CentralControlDaoImpl extends BaseDaoImpl<CentralControl> implements CentralControlDao {

    @Override
    public boolean isCentralControlExists(String companyId) {
        return this.getMongoTemplate().exists(
                new Query(Criteria.where("companyId").is(companyId)),
                CentralControl.class);
    }

    @Override
    public boolean updatePrayerConfig(String companyId, PrayerConfig prayerConfig) {
        Query query = new Query(Criteria.where("companyId").is(companyId));
        Update update = new Update().set("prayerConfig", prayerConfig);
        UpdateResult updateResult = this.getMongoTemplate().updateMulti(query, update, CentralControl.class);
        return updateResult != null && updateResult.isModifiedCountAvailable();
    }

    // TODO remove below method this is just for testing updating complex object
    // https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#db.collection.findAndModify
    // https://stackoverflow.com/questions/47699646/updating-replacing-a-deeply-nested-object-in-mongodb-with-spring-data-mongodb
    public void updateComplexObject() {
        // Query reference
        // https://www.baeldung.com/queries-in-spring-data-mongodb
        Query query = new Query(Criteria.where("companyId").is("company1"));
        Update update = new Update().set("jummahs.0.khateeb", "Kateeb 1 Changed again");
        UpdateResult updateResult = this.getMongoTemplate().updateMulti(query, update, CentralControl.class);
        System.out.println(updateResult);
        List<CentralControl> centralControls = this.getMongoTemplate().find(new Query(Criteria.where("companyId").is("company1")), CentralControl.class);
        System.out.println(centralControls);

        List<CentralControl> centralControls1 = this.getMongoTemplate().findAll(CentralControl.class);
        centralControls1.forEach(System.out::println);
    }

    @Override
    protected Class getType() {
        return CentralControl.class;
    }
}
