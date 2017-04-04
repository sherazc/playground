package com.sc.spring3.dao;

import org.springframework.stereotype.Repository;

import com.sc.spring3.entity.UserAddress;

@Repository("userAddressDao")
public class UserAddressDaoImpl extends BaseDaoImpl<UserAddress, Long> implements UserAddressDao {

	@Override
	public Class<UserAddress> getEntityClass() {
		return UserAddress.class;
	}

}
