package com.sc.cdb.data.dao;

import org.springframework.data.mongodb.core.aggregation.LookupOperation;

public class DaoConstants {
  static final LookupOperation COMPANY_LOOKUP_OPERATION = LookupOperation.newLookup()
      .from("company")
      .localField("companyId")
      .foreignField("_id")
      .as("company");
}
