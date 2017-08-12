package com.sc.reminder.ws.services;

import com.sc.reminder.api.service.SearchService;
import com.sc.reminder.ws.util.CommonUtil;

import java.io.InputStream;

/**
 * Created by sheraz on 11/5/15.
 */
public class ResourceSearchService extends SearchService {

    public static final String RESOURCE_QURAN_DIRECTORY = "/quran";
    public static final String DATA_INDEX_FILE_NAME = RESOURCE_QURAN_DIRECTORY + "/data_index.txt";
    public static final String QURAN_FILE_NAME = RESOURCE_QURAN_DIRECTORY + "/quran-uthmani.txt";

    public ResourceSearchService() {
        super(CommonUtil.openResourceInputStream(DATA_INDEX_FILE_NAME));
    }

    @Override
    protected InputStream openTranslationStream() {
        return CommonUtil.openResourceInputStream(getTranslationResourceFileName());
    }

    @Override
    protected InputStream openQuranStream() {
        return CommonUtil.openResourceInputStream(QURAN_FILE_NAME);
    }


    private String getTranslationResourceFileName() {
        return RESOURCE_QURAN_DIRECTORY + "/" + getTranslationDisplayName() + ".txt";
    }
}
