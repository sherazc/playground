package com.bitsegment.services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.bitsegment.dao.SecureUserDao;
import com.bitsegment.dao.SecureUserRoleDao;
import com.bitsegment.domain.SecureUser;
import com.bitsegment.domain.SecureUserRole;

@Service("securityAdminService")
public class SecurityAdminServiceImpl implements SecurityAdminService {

	@Inject
	@Named("secureUserDao")
	private SecureUserDao secureUserDao;
	
	@Inject
	@Named("secureUserRoleDao")
	private SecureUserRoleDao secureUserRoleDao;
	

	@Override
	public SecureUser getSecureUserById(Long adminId) {
		if (adminId == null || adminId < 1) {
			return null;
		}
		return secureUserDao.getById(adminId);
	}

	@Override
	public SecureUser getSecureUserByUserName(String userName) {
		if (StringUtils.isBlank(userName)) {
			return null;
		}
		return secureUserDao.getByUserName(userName);
	}

	@Override
	public void save(SecureUser secureUser) {
		if (secureUser == null) {
			return ;
		}
		secureUserDao.save(secureUser);
	}

	@Override
	public void removeAllAdminRoles(SecureUser secureUser) {
		List<SecureUserRole> userRoles = secureUserRoleDao.getUserRoleByUserName(secureUser.getUserName());
		if (userRoles != null) {
			for (SecureUserRole secureUserRole : userRoles) {
				secureUserRoleDao.remove(secureUserRole);
			}
		}
		secureUser.getSecureUserRoles().clear();
	}

	@Override
	public void removeRoles(List<SecureUserRole> userRoles) {
		if (userRoles != null) {
			for (SecureUserRole secureUserRole : userRoles) {
				secureUserRoleDao.remove(secureUserRole);
			}
		}
	}

	@Override
	public List<SecureUser> getAllSecureUsers() {
		return secureUserDao.getAll();
	}

	@Override
	public void removeSecureUserById(Long id) {
		if (id != null) {
			secureUserDao.removeById(id);
		}
	}
}
