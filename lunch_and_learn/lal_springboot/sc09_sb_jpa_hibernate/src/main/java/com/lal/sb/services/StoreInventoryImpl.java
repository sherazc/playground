package com.lal.sb.services;

import com.lal.sb.dao.SiteInventoryDao;
import com.lal.sb.dao.WarehouseInventoryDao;
import com.lal.sb.entity.SiteInventoryItem;
import com.lal.sb.entity.WarehouseInventoryItem;
import com.lal.sb.modal.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
public class StoreInventoryImpl implements StoreInventory {

    private SiteInventoryDao siteInventoryDao;
    private WarehouseInventoryDao warehouseInventoryDao;


    @Autowired
    public StoreInventoryImpl(
            SiteInventoryDao siteInventoryDao,
            WarehouseInventoryDao warehouseInventoryDao) {
        this.siteInventoryDao = siteInventoryDao;
        this.warehouseInventoryDao = warehouseInventoryDao;
    }

    @Override
    @Transactional
    public void storeItemInSite(Item item) {
        WarehouseInventoryItem warehouseInventoryItem = new WarehouseInventoryItem(item.getId(), item.getName(), item.getPrice());
        warehouseInventoryDao.save(warehouseInventoryItem);
    }

    @Override
    @Transactional
    public void storeItemInWarehouse(Item item) {
        SiteInventoryItem siteInventoryItem = new SiteInventoryItem(item.getId(), item.getName(), item.getPrice());
        siteInventoryDao.save(siteInventoryItem);
    }

    public List<Item> findAllInventory() {
        List<Item> allItems = new ArrayList<>();

        List<SiteInventoryItem> siteInventoryItems = siteInventoryDao.getAll();
        List<WarehouseInventoryItem> warehouseInventoryItems = warehouseInventoryDao.getAll();
        if (siteInventoryItems != null) {
            siteInventoryItems.forEach(
                    siteInventoryItem -> allItems.add(
                            new Item(siteInventoryItem.getId(),
                                    siteInventoryItem.getName(),
                                    siteInventoryItem.getPrice())));
        }


        if (warehouseInventoryItems != null) {
            warehouseInventoryItems.forEach(
                    warehouseInventoryItem -> allItems.add(
                            new Item(warehouseInventoryItem.getId(),
                                    warehouseInventoryItem.getName(),
                                    warehouseInventoryItem.getPrice())));
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
