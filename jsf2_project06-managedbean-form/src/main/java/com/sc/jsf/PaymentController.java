package com.sc.jsf;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean
@SessionScoped
public class PaymentController implements Serializable {

	private static final long serialVersionUID = 1L;

	private boolean registerdCompleted;

	private int orderQuantity;

	public boolean isRegisterdCompleted() {
		return registerdCompleted;
	}

	public void setRegisterdCompleted(boolean registerdCompleted) {
		this.registerdCompleted = registerdCompleted;
	}

	public int getOrderQuantity() {
		return orderQuantity;
	}

	public void setOrderQuantity(int orderQuantity) {
		this.orderQuantity = orderQuantity;
	}
}
