package com.sc.spring3.db.dao;

import java.util.List;

import com.sc.spring3.db.domain.Address;
import com.sc.spring3.utils.BeanUtils;

public class AddressDaoLiveTest {

	public static void main(String[] args) {
		AddressDao addressDao = (AddressDao) BeanUtils.getBean("addressDao");
		List<Address> adddress = addressDao.getAll();

		for (Address address : adddress) {
			System.out.println(address);
		}
	}
}
