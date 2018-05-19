package com.lal.dao;

import com.lal.entity.WarehouseInventoryItem;

import javax.persistence.EntityManager;
import java.util.List;

public interface WarehouseInventoryDao {
    List<WarehouseInventoryItem> getAll();

    void save(WarehouseInventoryItem warehouseInventoryItem);
}
