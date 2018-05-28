package com.sc.spring3;

import com.sc.spring3.dao.CustomerDao;
import com.sc.spring3.domain.Customer;
import com.sc.spring3.utils.BeanUtils;

public class CustomerDaoLiveTest {
	public static void main(String[] args) {
		CustomerDao customerDao = (CustomerDao) BeanUtils.getBean("customerDao");
		Customer customer = customerDao.getById(1000L);

		System.out.println(customer.getName());
		System.out.println(customer.getEmail());
		System.out.println(customer.getSalary());

		Customer customer2 = new Customer(null, "Unit Test name");
		customer2 = customerDao.save(customer2);

		System.out.println(customer2.getId());
		System.out.println(customer2.getName());

		customerDao.removeById(customer2.getId());
	}
}
