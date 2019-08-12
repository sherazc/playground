package com.sc.cdb.data.model.auth;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created this class for MongoDB aggregate.$lookup
 * https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
 * https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/aggregation/LookupOperation.html
 *
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class UserCompany extends User {
    private Company company;
}
