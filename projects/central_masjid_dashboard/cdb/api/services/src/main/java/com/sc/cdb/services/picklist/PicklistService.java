package com.sc.cdb.services.picklist;

import java.util.List;

import com.sc.cdb.data.dao.PicklistDao;
import com.sc.cdb.data.model.picklist.Configuration;
import org.springframework.stereotype.Service;

@Service
public class PicklistService {

    private PicklistDao picklistDao;

    public PicklistService(PicklistDao picklistDao) {
        this.picklistDao = picklistDao;
    }

    public List<Configuration> getAllConfiguration() {
        return picklistDao.getAllConfiguration();
    }

}
