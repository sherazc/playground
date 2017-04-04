package com.sc.icd.dao;

import java.io.Serializable;
import java.util.List;

public interface BaseDao<T extends Serializable, I extends Serializable> {

	T save(T t);

	void removeById(I id);

	T getById(I id);
	
	List<T> getAll();
}
