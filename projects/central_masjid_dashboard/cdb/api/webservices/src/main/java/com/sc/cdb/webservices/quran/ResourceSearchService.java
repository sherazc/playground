package com.sc.cdb.webservices.quran;
// package com.sc.reminder.ws.services;

// import com.sc.reminder.ws.util.CommonUtil;

import java.io.InputStream;

import com.sc.reminder.api.service.SearchService;

/**
 * Created by sheraz on 11/5/15.
 */
public class ResourceSearchService extends SearchService {

    public static final String RESOURCE_QURAN_DIRECTORY = "/quran";
    public static final String QURAN_FILE_NAME = RESOURCE_QURAN_DIRECTORY + "/quran-uthmani.txt";

    public ResourceSearchService() {
    }

    @Override
    protected InputStream openTranslationStream() {
        return ResourceSearchService.openResourceInputStream(
            getTranslationResourceFileName());
    }

    @Override
    protected InputStream openQuranStream() {
        return ResourceSearchService.openResourceInputStream(QURAN_FILE_NAME);
    }


    private String getTranslationResourceFileName() {
        return RESOURCE_QURAN_DIRECTORY + "/" + getTranslationDisplayName() + ".txt";
    }

    private static InputStream openResourceInputStream(String resourceName) {
        InputStream inputStream = null;
        try {
            inputStream = ResourceSearchService.class.getResource(resourceName).openStream();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return inputStream;
    }
}
