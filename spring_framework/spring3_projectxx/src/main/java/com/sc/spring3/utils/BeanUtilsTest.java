package com.sc.spring3.utils;

import java.util.List;

public class BeanUtilsTest {

	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		List<String> listString = (List<String>) BeanUtils.getBean("listString");
		for (String string : listString) {
			System.out.println(string);
		}
	}

}
