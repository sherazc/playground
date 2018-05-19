package com.lal.dao;

import com.lal.entity.SiteInventoryItem;
import org.hibernate.Session;

import java.util.List;

public interface SiteInventoryDao {

    List<SiteInventoryItem> getAll(Session session);

    void save(Session session, SiteInventoryItem siteInventoryItem);
}
