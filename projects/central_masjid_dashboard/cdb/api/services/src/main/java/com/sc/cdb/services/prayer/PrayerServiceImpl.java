package com.sc.cdb.services.prayer;

import java.text.MessageFormat;
import java.util.TimeZone;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.TimeZoneApi;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.sc.cdb.data.dao.CentralControlDao;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PrayerServiceImpl implements PrayerService {
    private static final Logger LOG = LoggerFactory.getLogger(PrayerServiceImpl.class);

    private String googleApiKey;

    private CentralControlDao centralControlDao;

    public PrayerServiceImpl(
            @Value("${google.geocode.api.key}") String googleApiKey,
            CentralControlDao centralControlDao) {
        this.googleApiKey = googleApiKey;
        this.centralControlDao = centralControlDao;
    }

    public ServiceResponse<GeoCode> geoCode(String location) {
        ServiceResponse.ServiceResponseBuilder<GeoCode> serviceResponseBuilder = ServiceResponse.builder();
        if (StringUtils.length(location) < 5) {
            serviceResponseBuilder.message("Not calling Google Geo Code. Invalid location=" + location);
            return serviceResponseBuilder.build();
        }
        LOG.info("Calling Google Geo Code to find location={}", location);

        GeoApiContext context = new GeoApiContext.Builder().apiKey(googleApiKey).build();

        try {
            LatLng latLng = pullLatLng(GeocodingApi.geocode(context, location).await());
            if (latLng != null) {
                LOG.info("Successfully found location's latitude={}, longitude={}. Now calling Google timezone API.",
                        latLng.lat, latLng.lng);

                TimeZone timeZoneResponse = TimeZoneApi.getTimeZone(context, latLng).await();
                if (timeZoneResponse != null) {
                    LOG.info("Successfully found timezone {}.", timeZoneResponse.getID());
                    GeoCode geoCode = new GeoCode();
                    geoCode.setLatitude(latLng.lat);
                    geoCode.setLongitude(latLng.lng);
                    geoCode.setTimezone(timeZoneResponse.getRawOffset() / 3600000D); // convert milliseconds to hours
                    geoCode.setTimezoneId(timeZoneResponse.getID());
                    geoCode.setTimezoneName(timeZoneResponse.getDisplayName());

                    serviceResponseBuilder.target(geoCode);
                    serviceResponseBuilder.successful(true);
                } else {
                    LOG.error("Can not find timezone for latitude={}, longitude={}.", latLng.lat, latLng.lng);
                }
            } else {
                LOG.error("Can not Geocode {}. Unable to find latitude, longitude.", location);
            }
        } catch (Exception e) {
            String errorMessage = MessageFormat.format(
                    "Failed to call Google Geo Code and timezone API. location={0}. {1}",
                    location, e.getMessage());
            LOG.error(errorMessage, e);
            serviceResponseBuilder.message(errorMessage);
        }

        return serviceResponseBuilder.build();
    }

    @Override
    public ServiceResponse<String> savePrayerConfig(String companyId, PrayerConfig prayerConfig) {
        LOG.debug("Saving prayer config of {}", companyId);

        ServiceResponse.ServiceResponseBuilder<String> serviceResponseBuilder = ServiceResponse.builder();
        if (StringUtils.isBlank(companyId) || !isValid(prayerConfig)) {
            String errorMessage =
                    "Can not process request. CompanyId is blank or prayer configs not sent.";
            LOG.error(errorMessage);
            serviceResponseBuilder.message(errorMessage);
            return serviceResponseBuilder.build();
        }

        if (centralControlDao.isCentralControlExists(companyId)) {
            boolean updated = centralControlDao.updatePrayerConfig(companyId, prayerConfig);
            if (updated) {
                serviceResponseBuilder.successful(true);
                String message = String.format("Updated Prayer config of %s", companyId);
                serviceResponseBuilder.message(message);
                LOG.debug(message);
            }
        } else {
            CentralControl centralControl = new CentralControl();
            centralControl.setCompanyId(companyId);
            centralControl.setPrayerConfig(prayerConfig);
            CentralControl savedCentralControl = centralControlDao.save(centralControl);
            if (savedCentralControl != null && StringUtils.isNotBlank(savedCentralControl.getId())) {
                serviceResponseBuilder.successful(true);
                String message = String.format("Saved Prayer config of %s", companyId);
                serviceResponseBuilder.message(message);
                LOG.debug(message);
            }
        }
        return serviceResponseBuilder.build();
    }

    private boolean isValid(PrayerConfig prayerConfig) {
        // TODO validate full prayer config.
        return prayerConfig != null && prayerConfig.getGeoCode() != null;
    }

    private LatLng pullLatLng(GeocodingResult[] geocodingResults) {
        if (geocodingResults != null && geocodingResults.length > 0
                && geocodingResults[0].geometry != null
                && geocodingResults[0].geometry.location != null
                && geocodingResults[0].geometry.location.lat != 0
                && geocodingResults[0].geometry.location.lng != 0) {
            return geocodingResults[0].geometry.location;
        } else {
            return null;
        }
    }
}
