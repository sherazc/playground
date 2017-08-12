package com.sc.springboot.dao.base;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;

public abstract class BaseDaoImpl<T, ID extends Serializable> {
    Class<T> persistentClass;

    @SuppressWarnings("unchecked")
    public BaseDaoImpl() {
        this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }
}
