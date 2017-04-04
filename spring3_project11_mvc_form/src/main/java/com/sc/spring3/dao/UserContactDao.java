package com.sc.spring3.dao;

import com.sc.spring3.entity.UserContact;

public interface UserContactDao extends BaseDao<UserContact, Long> {
	
	UserContact getByUserIdPassword(String userId, String userPassword);

}
