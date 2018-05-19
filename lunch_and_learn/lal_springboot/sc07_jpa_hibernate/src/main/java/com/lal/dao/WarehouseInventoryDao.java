package com.lal.dao;

import com.lal.entity.WarehouseInventoryItem;

import javax.persistence.EntityManager;
import java.util.List;

public interface WarehouseInventoryDao {
    List<WarehouseInventoryItem> getAll(EntityManager session);

    void save(EntityManager session, WarehouseInventoryItem warehouseInventoryItem);
}
