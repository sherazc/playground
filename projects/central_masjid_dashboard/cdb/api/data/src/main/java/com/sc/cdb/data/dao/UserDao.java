package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.User;
import com.sc.cdb.data.model.UserCompany;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDao {

    private MongoTemplate mongoTemplate;
    private static final LookupOperation USER_COMPANY_LOOKUP_OPERATION = LookupOperation.newLookup()
            .from("company")
            .localField("companyId")
            .foreignField("_id")
            .as("company");


    public UserDao(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<UserCompany> findAll() {
        Aggregation aggregation = Aggregation.newAggregation(USER_COMPANY_LOOKUP_OPERATION);
        return mongoTemplate.aggregate(aggregation, "user", UserCompany.class).getMappedResults();
    }


    public List<UserCompany> findByCompanyId(String companyId) {
        Criteria companyIdCriteria = Criteria.where("companyId").is(companyId);
        Aggregation aggregation = Aggregation.newAggregation(Aggregation.match(companyIdCriteria), USER_COMPANY_LOOKUP_OPERATION);
        return mongoTemplate.aggregate(aggregation, "user", UserCompany.class).getMappedResults();
    }



/*
Joining Two Collections with Spring Data MongoDB

Employee Class

class Employee {
    private String _id;enter code here
    private String name;
    private String dept_id;
}

Department Class

class Department {
    private String _id;
    private String dept_name;
}

Employee Result Class ` public class EmpDeptResult {

private String _id;
private String name;
private List<Object> departments;
}`

EmployeeSerivce `public class EmployeeService {

@Autowired
private MongoTemplate mongoTemplate;

private Logger LOGGER = LoggerFactory.getLogger(EmployeeService.class);

public void lookupOperation(){
    LookupOperation lookupOperation = LookupOperation.newLookup()
                        .from("Department")
                        .localField("dept_id")
                        .foreignField("_id")
                        .as("departments");

    Aggregation aggregation = Aggregation.newAggregation(Aggregation.match(Criteria.where("_id").is("1")) , lookupOperation);
    List<EmpDeptResult> results = mongoTemplate.aggregate(aggregation, "Employee", EmpDeptResult.class).getMappedResults();
    LOGGER.info("Obj Size " +results.size());
}
}`

*/

}
