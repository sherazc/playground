package com.lal.services;

import com.lal.dao.SiteInventoryDao;
import com.lal.dao.WarehouseInventoryDao;
import com.lal.modal.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StoreInventoryImpl implements StoreInventory {

    private SiteInventoryDao siteInventoryDao;
    private WarehouseInventoryDao warehouseInventoryDao;

    private StoreInventoryImpl() {
    }

    @Autowired
    private StoreInventoryImpl(SiteInventoryDao siteInventoryDao,
                              WarehouseInventoryDao warehouseInventoryDao) {
        this.siteInventoryDao = siteInventoryDao;
        this.warehouseInventoryDao = warehouseInventoryDao;
    }

    public List<Item> findAllInventory() {
        List<Item> siteItems = siteInventoryDao.getAll();
        List<Item> warehouseItems = warehouseInventoryDao.getAll();
        List<Item> allItems = new ArrayList<Item>();
        if (siteItems != null) {
            allItems.addAll(siteItems);
        }
        if (warehouseItems != null) {
            allItems.addAll(warehouseItems);
        }
        return allItems;
    }

    private static StoreInventory storeInventory;

    public static StoreInventory create(SiteInventoryDao siteInventoryDao,
                                              WarehouseInventoryDao warehouseInventoryDao) {
        if (storeInventory == null) {
            storeInventory = new StoreInventoryImpl(siteInventoryDao, warehouseInventoryDao);
        }
        return storeInventory;
    }
}
