package com.sc.cdb.data.dao;

import com.mongodb.client.result.UpdateResult;
import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.CompanyUsers;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CompanyDaoImpl extends BaseDaoImpl<Company> implements CompanyDao {

    static final LookupOperation COMPANY_USERS_LOOKUP_OPERATION = LookupOperation.newLookup()
            .from("user")
            .localField("_id")
            .foreignField("companyId")
            .as("users");


    @Override
    public boolean activateCompany(String companyId, boolean active) {
        Query query = new Query(Criteria.where("_id").is(new ObjectId(companyId)));
        Update update = new Update().set("active", active);
        UpdateResult updateResult = this.getMongoTemplate().updateMulti(query, update, Company.class);
        return updateResult.getMatchedCount() > 0L;
    }

    @Override
    public List<CompanyUsers> findAllCompanyUsers() {
        Aggregation aggregation = Aggregation
                .newAggregation(COMPANY_USERS_LOOKUP_OPERATION);
        return this
                .getMongoTemplate()
                .aggregate(
                        aggregation,
                        "company",
                        CompanyUsers.class)
                .getMappedResults();
    }

    @Override
    public List<CompanyUsers> findCompanyUsersByCompanyId(String companyId) {
        Criteria criteria = Criteria
                .where("_id")
                .is(new ObjectId(companyId));

        Aggregation aggregation = Aggregation
                .newAggregation(
                        Aggregation.match(criteria),
                        COMPANY_USERS_LOOKUP_OPERATION);

        return this
                .getMongoTemplate()
                .aggregate(
                        aggregation,
                        "company",
                        CompanyUsers.class)
                .getMappedResults();
    }

    @Override
    Class<Company> getType() {
        return Company.class;
    }
}
