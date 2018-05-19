package com.lal.dao;

import com.lal.entity.SiteInventoryItem;

import javax.persistence.EntityManager;
import java.util.List;

public interface SiteInventoryDao {

    List<SiteInventoryItem> getAll(EntityManager entityManager);

    void save(EntityManager entityManager, SiteInventoryItem siteInventoryItem);
}
