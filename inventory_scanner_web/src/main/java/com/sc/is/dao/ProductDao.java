package com.sc.is.dao;

import java.io.Serializable;

import com.sc.is.domain.Product;

public interface ProductDao extends Serializable {

	Product getProductByCode(String code);
}
