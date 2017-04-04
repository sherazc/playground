package com.sc.spring3.aop2;

import com.sc.spring3.utils.BeanUtils;

public class ThinkerMain {
	public static void main(String[] args) {
		Thinker thinker = (Thinker) BeanUtils.getBean("volunteer");
		thinker.thinkOfSomething("car");
	}
}
