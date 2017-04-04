package com.sc.dao;

import java.io.Serializable;

public interface BaseDao<T extends Serializable, I extends Serializable> extends Serializable {

	T save(T t);

	void removeById(I id);

	T getById(I id);
}
