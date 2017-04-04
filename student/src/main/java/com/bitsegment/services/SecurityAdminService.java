package com.bitsegment.services;

import java.text.SimpleDateFormat;
import java.util.List;

import com.bitsegment.domain.SecureUser;
import com.bitsegment.domain.SecureUserRole;

public interface SecurityAdminService {

	public static final SimpleDateFormat CODE_DATE_FORMAT = new SimpleDateFormat("yyyyMMddHHmm-mmHHddMMyyyy");

	SecureUser getSecureUserById(Long adminId);

	SecureUser getSecureUserByUserName(String userName);

	void save(SecureUser secureUser);

	void removeAllAdminRoles(SecureUser secureUser);

	void removeRoles(List<SecureUserRole> rolesToRemove);

	List<SecureUser> getAllSecureUsers();

	void removeSecureUserById(Long id);
}
