package com.bitsegment.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.bitsegment.domain.SecureUser;

@Repository("secureUserDao")
public class SecureUserDaoImpl extends BaseDaoImpl<SecureUser, Long> implements SecureUserDao {

	private static final Log LOG = LogFactory.getLog(SecureUserDaoImpl.class);

	@Override
	public Class<SecureUser> getEntityClass() {
		return SecureUser.class;
	}

	@SuppressWarnings("unchecked")
	@Override
	public SecureUser getByUserName(String userName) {
		Query query = getEm().createNamedQuery("userByUserName");
		query.setParameter("userName", userName);
		List<SecureUser> resultList = query.getResultList();
		if (resultList != null && resultList.size() > 0) {
			return resultList.get(0);
		} else {
			return null;
		}
	}

}
