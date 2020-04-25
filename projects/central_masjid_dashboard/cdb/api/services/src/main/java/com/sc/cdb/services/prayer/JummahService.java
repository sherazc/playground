package com.sc.cdb.services.prayer;

import java.util.List;

import com.sc.cdb.data.model.cc.Jummah;
import com.sc.cdb.services.model.ServiceResponse;

public interface JummahService {
    ServiceResponse<List<Jummah>> schedule(String companyId);
}
