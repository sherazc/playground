package com.sc.spring3.aop;

import com.sc.spring3.utils.BeanUtils;

public class PerformerMain {
	public static void main(String[] args) {
		Performer drummer = (Performer) BeanUtils.getBean("drummer");
		drummer.perform(1);
	}
}
