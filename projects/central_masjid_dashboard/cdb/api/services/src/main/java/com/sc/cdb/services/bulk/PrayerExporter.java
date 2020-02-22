package com.sc.cdb.services.bulk;

import java.io.PrintWriter;

import com.sc.cdb.services.model.ServiceResponse;

public interface PrayerExporter {
    ServiceResponse<String> exportPrayerToWriter(PrintWriter writer, String companyId);
}
