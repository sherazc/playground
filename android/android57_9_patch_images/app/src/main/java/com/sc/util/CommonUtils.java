package com.sc.util;

import android.content.res.Resources;

/**
 * Created by SherazD on 4/13/2015.
 */
public class CommonUtils {

    public static int dpToPx(int dp){
        return (int) (dp * Resources.getSystem().getDisplayMetrics().density);
    }

    public static int pxToDp(int px){
        return (int) (px / Resources.getSystem().getDisplayMetrics().density);
    }
}
