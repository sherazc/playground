package com.sc.rotd.app.utils;

import android.content.Context;

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

}
