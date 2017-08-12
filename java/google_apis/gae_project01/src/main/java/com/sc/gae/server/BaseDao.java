package com.sc.gae.server;

import java.io.Serializable;

public interface BaseDao<T extends Serializable, I extends Serializable> {

	T save(T t);

	void removeById(I id);

	T getById(I id);
}
