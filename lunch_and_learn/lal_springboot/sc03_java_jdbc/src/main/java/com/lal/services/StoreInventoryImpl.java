package com.lal.services;

import com.lal.dao.SiteInventoryDao;
import com.lal.dao.WarehouseInventoryDao;
import com.lal.modal.Item;

import java.util.ArrayList;
import java.util.List;

public class StoreInventoryImpl implements StoreInventory {

    private SiteInventoryDao siteInventoryDao;
    private WarehouseInventoryDao warehouseInventoryDao;

    public StoreInventoryImpl(SiteInventoryDao siteInventoryDao,
                              WarehouseInventoryDao warehouseInventoryDao) {
        this.siteInventoryDao = siteInventoryDao;
        this.warehouseInventoryDao = warehouseInventoryDao;
    }

    public List<Item> findAllInventory() {
        List<Item> siteItems = siteInventoryDao.getAll();
        List<Item> warehouseItems = warehouseInventoryDao.getAll();
        List<Item> allItems = new ArrayList<Item>();
        allItems.addAll(siteItems);
        allItems.addAll(warehouseItems);
        return allItems;
    }
}
