package com.sc.jsf;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.NoneScoped;

@ManagedBean(name = "beanA")
@NoneScoped
public class BeanA {

	public String doService() {
		return "This message is from BeanA. ";
	}
}
