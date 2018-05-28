package com.sc.spring3;

import com.sc.spring3.dao.CustomerDao;
import com.sc.spring3.domain.Customer;
import com.sc.spring3.utils.BeanUtils;

public class CustomerDaoLiveTest {
	public static void main(String[] args) {
		CustomerDao userDao = (CustomerDao) BeanUtils.getBean("customerDao");
		Customer user = userDao.getById(1000L);

		System.out.println(user.getName());
		System.out.println(user.getEmail());
		System.out.println(user.getSalary());
	}
}
