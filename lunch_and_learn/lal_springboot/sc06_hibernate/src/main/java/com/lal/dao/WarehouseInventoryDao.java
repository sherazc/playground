package com.lal.dao;

import com.lal.entity.WarehouseInventoryItem;
import org.hibernate.Session;

import java.util.List;

public interface WarehouseInventoryDao {
    List<WarehouseInventoryItem> getAll(Session session);

    void save(Session session, WarehouseInventoryItem warehouseInventoryItem);
}
