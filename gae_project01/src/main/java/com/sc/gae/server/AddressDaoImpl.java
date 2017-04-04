package com.sc.gae.server;

import org.springframework.stereotype.Repository;

import com.sc.gae.model.Address;

@Repository("addressDao")
public class AddressDaoImpl extends BaseDaoImpl<Address, Long> implements AddressDao {

	public Class<Address> getEntityClass() {
		return Address.class;
	}
}
