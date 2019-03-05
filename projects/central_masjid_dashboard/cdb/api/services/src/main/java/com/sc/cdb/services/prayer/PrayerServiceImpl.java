package com.sc.cdb.services.prayer;

import java.text.MessageFormat;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.sc.cdb.data.model.prayer.GeoCode;
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

    public PrayerServiceImpl(@Value("${google.geocode.api.key}") String googleApiKey) {
        this.googleApiKey = googleApiKey;
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
                LOG.info("Successfully found location's latitude={}, longitude={}",
                    latLng.lat, latLng.lng);
                GeoCode geoCode = new GeoCode(latLng.lat, latLng.lng);
                serviceResponseBuilder.target(geoCode);
                serviceResponseBuilder.successful(true);
            }
        } catch (Exception e) {
            String errorMessage = MessageFormat.format(
                "Failed to call Google Geo Code API. location={0}. {1}",
                location, e.getMessage());
            LOG.error(errorMessage, e);
            serviceResponseBuilder.message(errorMessage);
        }

        return serviceResponseBuilder.build();
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
