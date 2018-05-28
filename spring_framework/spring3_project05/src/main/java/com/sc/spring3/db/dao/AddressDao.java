package com.sc.spring3.db.dao;

import java.util.Map;

import com.sc.spring3.db.domain.Address;

public class AddressDao extends BaseDao<Address> {

	public Address rowToAddress(Map<String, Object> row) {
		return new Address(new Long((Integer) row.get("id")), (String) row.get("street"), (String) row.get("city"),
				(String) row.get("zip"));
	}


	public String getAllQuery() {
		return "select id, street, city, zip from address";
	}
}
