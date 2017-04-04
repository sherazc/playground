package com.bitsegment.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.bitsegment.domain.SecureUserRole;

@Repository("secureUserRoleDao")
public class SecureUserRoleDaoImpl extends BaseDaoImpl<SecureUserRole, Long> implements SecureUserRoleDao {

	private static final Log LOG = LogFactory.getLog(SecureUserRoleDaoImpl.class);

	@Override
	public Class<SecureUserRole> getEntityClass() {
		return SecureUserRole.class;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SecureUserRole> getUserRoleByUserName(String userName) {
		if (StringUtils.isBlank(userName)) {
			return null;
		}
		Query query = getEm().createNamedQuery("userRoleByUserName");
		query.setParameter("userName", userName);
		return query.getResultList();
	}

}
