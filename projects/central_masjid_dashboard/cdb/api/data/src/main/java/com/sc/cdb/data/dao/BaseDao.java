package com.sc.cdb.data.dao;

public interface BaseDao<T> {
    T save(T collection);

    T findById(String id);
}
