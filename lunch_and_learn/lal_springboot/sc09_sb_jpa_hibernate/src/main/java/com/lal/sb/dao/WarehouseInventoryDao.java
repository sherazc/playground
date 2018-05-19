package com.lal.sb.dao;

import com.lal.sb.entity.WarehouseInventoryItem;

import java.util.List;

public interface WarehouseInventoryDao {
    List<WarehouseInventoryItem> getAll();

    void save(WarehouseInventoryItem warehouseInventoryItem);
}
