package com.sc.springboot.dao.base;

import java.io.Serializable;
import java.util.List;

public interface BaseDao<T, ID extends Serializable> {
    List<T> findAll();
}
