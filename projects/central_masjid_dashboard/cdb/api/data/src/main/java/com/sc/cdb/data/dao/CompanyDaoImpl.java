package com.sc.cdb.data.dao;

import com.mongodb.client.result.UpdateResult;
import com.sc.cdb.data.model.auth.Company;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyDaoImpl extends BaseDaoImpl<Company> implements CompanyDao {

    @Override
    public boolean activateCompany(String companyId, boolean active) {
        Query query = new Query(Criteria.where("_id").is(new ObjectId(companyId)));
        Update update = new Update().set("active", active);
        UpdateResult updateResult = this.getMongoTemplate().updateMulti(query, update, Company.class);
        return updateResult.getMatchedCount() > 0L;
    }

    @Override
    Class<Company> getType() {
        return Company.class;
    }
}
