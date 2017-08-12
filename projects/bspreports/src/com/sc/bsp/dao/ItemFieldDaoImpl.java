package com.sc.bsp.dao;

import org.springframework.stereotype.Repository;

import com.google.appengine.api.datastore.Key;
import com.sc.bsp.domain.ItemField;

@Repository("itemFieldDao")
public class ItemFieldDaoImpl extends BaseDaoImpl<ItemField, Key> implements ItemFieldDao {

	@Override
	public Class<ItemField> getEntityClass() {
		return ItemField.class;
	}

}
