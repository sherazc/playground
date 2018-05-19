package com.lal.dao;

import com.lal.entity.WarehouseInventoryItem;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;


public class WarehouseInventoryDaoImpl implements WarehouseInventoryDao {

    @Override
    public List<WarehouseInventoryItem> getAll(EntityManager session) {
        Query query = session.createQuery("from WarehouseInventoryItem");
        return query.getResultList();
    }

    @Override
    public void save(EntityManager session, WarehouseInventoryItem warehouseInventoryItem) {
        session.persist(warehouseInventoryItem);
    }
}
