package com.sc.rotd.app.service;

import android.content.Context;
import com.sc.rotd.app.utils.CommonAndroidUtils;
import com.sc.service.SearchService;

import java.io.InputStream;

public class SearchServiceAndroid extends SearchService {

    private Context context;

    public SearchServiceAndroid(Context context) {
        super(CommonAndroidUtils.openAssetsInputStream(context, "data_index.txt"));
        this.context = context;
    }

    @Override
    protected InputStream openTranslationStream() {
        return CommonAndroidUtils.openAssetsInputStream(context, "en.yusufali.txt");
    }

    @Override
    protected InputStream openQuranStream() {
        return CommonAndroidUtils.openAssetsInputStream(context, "quran-uthmani.txt");
    }
}
