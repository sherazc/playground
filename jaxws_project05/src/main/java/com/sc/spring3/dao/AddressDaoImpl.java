package com.sc.spring3.dao;

import org.springframework.stereotype.Repository;

import com.sc.spring3.domain.Address;

@Repository("addressDao")
public class AddressDaoImpl extends BaseDaoImpl<Address, Long> implements AddressDao {

	public Class<Address> getEntityClass() {
		return Address.class;
	}
}
