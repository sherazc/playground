package com.sc.spring3.aop;

import org.aspectj.lang.ProceedingJoinPoint;

public class Stage {
	
	public void setupInstruments(ProceedingJoinPoint joinpoint) throws Throwable {
		System.out.println("Setup instruments on stage.");
		joinpoint.proceed();
		System.out.println("Cleaning up stage.");
	}
}
