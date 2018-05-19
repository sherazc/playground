package com.lal.dao;

import com.lal.entity.SiteInventoryItem;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class SiteInventoryDaoImpl implements SiteInventoryDao {

    @Override
    public List<SiteInventoryItem> getAll(EntityManager entityManager) {
        Query query = entityManager.createQuery("from SiteInventoryItem");
        return query.getResultList();
    }

    @Override
    public void save(EntityManager entityManager, SiteInventoryItem siteInventoryItem) {
        entityManager.persist(siteInventoryItem);
    }
}
