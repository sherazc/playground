package com.sc.spring3.dao;

import org.springframework.stereotype.Repository;

import com.sc.spring3.domain.StoreItem;

@Repository("storeItemDao")
public class StoreItemDao extends BaseDaoImpl<StoreItem, Long> {

	@Override
	public Class<StoreItem> getEntityClass() {
		return StoreItem.class;
	}

}
