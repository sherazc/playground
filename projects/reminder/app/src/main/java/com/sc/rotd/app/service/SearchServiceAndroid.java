package com.sc.rotd.app.service;

import android.content.Context;
import com.sc.rotd.api.service.SearchService;
import com.sc.rotd.api.utils.CommonUtils;
import com.sc.rotd.app.utils.CommonAndroidUtils;
import com.sc.rotd.app.view.TranslationViewArrayAdapter;

import java.io.InputStream;

public class SearchServiceAndroid extends SearchService {

    public static final String DATA_INDEX_FILE_NAME = "data_index.txt";
    public static final String QURAN_FILE_NAME = "quran-uthmani.txt";
    private Context context;
    private static SearchService searchService;

    public SearchServiceAndroid(Context context) {
        super(CommonAndroidUtils.openAssetsInputStream(context, DATA_INDEX_FILE_NAME));
        this.context = context;
    }

    @Override
    protected InputStream openTranslationStream() {
        return CommonAndroidUtils.openAssetsInputStream(context,
                CommonUtils.displayNameToFileName(getTranslationDisplayName()));
    }

    @Override
    protected InputStream openQuranStream() {
        return CommonAndroidUtils.openAssetsInputStream(context, QURAN_FILE_NAME);
    }

    public static SearchService buildSearchService(Context context, String translationDisplayName) {

        if (searchService == null) {
            searchService = new SearchServiceAndroid(context);
        }

        if (CommonUtils.isBlank(translationDisplayName)) {
            searchService.setTranslationDisplayName(TranslationViewArrayAdapter.DEFAULT_TRANSLATION);
        } else {
            searchService.setTranslationDisplayName(translationDisplayName);
        }

        return searchService;
    }

}
