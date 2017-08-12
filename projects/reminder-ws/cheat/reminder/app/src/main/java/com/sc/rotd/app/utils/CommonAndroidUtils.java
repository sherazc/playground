package com.sc.rotd.app.utils;

import android.content.Context;
import android.util.DisplayMetrics;
import com.sc.rotd.api.utils.CommonUtils;
import com.sc.rotd.app.persistence.SharedPreferencesManager;
import com.sc.rotd.app.view.TranslationViewArrayAdapter;

import java.io.IOException;
import java.io.InputStream;

public class CommonAndroidUtils {

    private CommonAndroidUtils() {
    }

    public static InputStream openAssetsInputStream(Context context, String fileName) {
        InputStream inputStream = null;
        try {
            inputStream = context.getAssets().open(fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return inputStream;
    }

    public static String translationNameFromSPM(SharedPreferencesManager sharedPreferencesManager) {
        String selectedTranslationName = sharedPreferencesManager.findStringValue(
                TranslationViewArrayAdapter.TRANSLATION_DISPLAY_NAME_PREFERENCE);
        if (CommonUtils.isBlank(selectedTranslationName)) {
            selectedTranslationName = TranslationViewArrayAdapter.DEFAULT_TRANSLATION;
        }
        return selectedTranslationName;
    }

    public static int convertDip(DisplayMetrics displayMetrics, int dp) {
        float density = displayMetrics.density;
        return (int) (density * dp);
    }
}
