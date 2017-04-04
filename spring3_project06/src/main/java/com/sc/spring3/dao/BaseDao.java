package com.sc.spring3.dao;

import java.io.Serializable;

public interface BaseDao<T extends Serializable, I extends Serializable> {

	void save(T t);

	void removeById(I id);

	T getById(I id);
}
