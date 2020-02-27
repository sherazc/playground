package com.sc.cdb.services.bulk;

import java.io.PrintWriter;

import com.sc.cdb.data.model.common.File;
import com.sc.cdb.services.model.ServiceResponse;

public interface PrayerExporter {
    ServiceResponse<File> exportPrayerToWriter(String companyId);
}
