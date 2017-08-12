package com.bitsegment.dao;

import com.bitsegment.domain.SecureUser;

public interface SecureUserDao extends BaseDao<SecureUser, Long> {

	SecureUser getByUserName(String userName);

}
