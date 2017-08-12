package com.sc.jsf;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

@ManagedBean(name = "combineBean")
public class CombineBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{beanA}")
	private BeanA beanA;

	@ManagedProperty(value = "#{beanB}")
	private BeanB beanB;

	@ManagedProperty(value = "This message is from BeanC. ")
	private String beanC;

	public String getCombineMessages() {
		return beanA.doService() + beanB.doService() + beanC;
	}

	public BeanA getBeanA() {
		return beanA;
	}

	public void setBeanA(BeanA beanA) {
		this.beanA = beanA;
	}

	public BeanB getBeanB() {
		return beanB;
	}

	public void setBeanB(BeanB beanB) {
		this.beanB = beanB;
	}

	public String getBeanC() {
		return beanC;
	}

	public void setBeanC(String beanC) {
		this.beanC = beanC;
	}
}
