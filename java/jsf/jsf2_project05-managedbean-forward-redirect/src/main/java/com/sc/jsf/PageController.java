package com.sc.jsf;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean
@SessionScoped
public class PageController implements Serializable {
	private static final long serialVersionUID = 1L;

	public String moveToPage2() {
		return "page2";
	}
	
	public String moveToPage2redirect() {
		return "page2?faces-redirect=true";
	}
}
