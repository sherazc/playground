package com.lal.dao;

import com.lal.entity.WarehouseInventoryItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class WarehouseInventoryDaoImpl implements WarehouseInventoryDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<WarehouseInventoryItem> getAll() {
        Query query = entityManager.createQuery("from WarehouseInventoryItem");
        return query.getResultList();
    }

    @Override
    public void save(WarehouseInventoryItem warehouseInventoryItem) {
        entityManager.persist(warehouseInventoryItem);
    }
}
