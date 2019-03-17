package com.sc.cdb.services.location;

import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.services.model.ServiceResponse;

public interface SiteLocator {
    ServiceResponse<GeoCode> geoCode(String location);
}
