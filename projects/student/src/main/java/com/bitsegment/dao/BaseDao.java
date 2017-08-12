package com.bitsegment.dao;

import java.io.Serializable;
import java.util.List;

public interface BaseDao<T extends Serializable, I extends Serializable> {

	T save(T t);

	void removeById(I id);
	
	void remove(T entity);

	T getById(I id);
	
	List<T> getAll();
	
	List<T> getAllLimit(int firstResultIndex, int maxResults);
}
