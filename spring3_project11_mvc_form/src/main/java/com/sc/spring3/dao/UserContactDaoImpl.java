package com.sc.spring3.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.sc.spring3.entity.UserContact;

@Repository("userContactDao")
public class UserContactDaoImpl extends BaseDaoImpl<UserContact, Long> implements UserContactDao {

	@Override
	public Class<UserContact> getEntityClass() {
		return UserContact.class;
	}

	@SuppressWarnings("unchecked")
	@Override
	public UserContact getByUserIdPassword(String userId, String userPassword) {
		if (StringUtils.isBlank(userId) && StringUtils.isBlank(userPassword)) {
			return null;
		}

		Query query = this.getEm().createNamedQuery("userContactByUserIdPassword");
		query.setParameter("userId", userId);
		query.setParameter("userPassword", userPassword);

		List<UserContact> userContacts = query.getResultList();
		if (userContacts == null || userContacts.size() < 1) {
			return null;
		} else {
			return userContacts.get(0);
		}
	}
}
