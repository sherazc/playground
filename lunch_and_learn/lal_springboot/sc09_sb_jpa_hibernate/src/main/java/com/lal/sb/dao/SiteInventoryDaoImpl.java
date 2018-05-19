package com.lal.sb.dao;

import com.lal.sb.entity.SiteInventoryItem;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class SiteInventoryDaoImpl implements SiteInventoryDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SiteInventoryItem> getAll() {
        Query query = entityManager.createQuery("from SiteInventoryItem");
        return query.getResultList();
    }

    @Override
    public void save(SiteInventoryItem siteInventoryItem) {
        entityManager.persist(siteInventoryItem);
    }
}
