package com.lal.services;

import com.lal.dao.SiteInventoryDao;
import com.lal.dao.WarehouseInventoryDao;
import com.lal.datasource.ConnectionUtil;
import com.lal.entity.SiteInventoryItem;
import com.lal.entity.WarehouseInventoryItem;
import com.lal.modal.Item;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
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

    @Override
    public void storeItemInSite(Item item) {
        WarehouseInventoryItem warehouseInventoryItem = new WarehouseInventoryItem(item.getId(), item.getName(), item.getPrice());
        EntityManager entityManager = ConnectionUtil.getEmf().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        warehouseInventoryDao.save(entityManager, warehouseInventoryItem);
        transaction.commit();
    }

    @Override
    public void storeItemInWarehouse(Item item) {
        SiteInventoryItem siteInventoryItem = new SiteInventoryItem(item.getId(), item.getName(), item.getPrice());

        EntityManager entityManager = ConnectionUtil.getEmf().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        siteInventoryDao.save(entityManager, siteInventoryItem);
        transaction.commit();
    }

    public List<Item> findAllInventory() {
        EntityManager entityManager = ConnectionUtil.getEmf().createEntityManager();

        List<Item> allItems = new ArrayList<>();

        List<SiteInventoryItem> siteInventoryItems = siteInventoryDao.getAll(entityManager);
        List<WarehouseInventoryItem> warehouseInventoryItems = warehouseInventoryDao.getAll(entityManager);
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
