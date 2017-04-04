package com.bitsegment.dao;

import java.util.List;

import com.bitsegment.domain.Authority;
import com.bitsegment.domain.SecureUserRole;

public interface SecureUserRoleDao extends BaseDao<SecureUserRole, Long> {

	List<SecureUserRole> getUserRoleByUserName(String userName);

}
