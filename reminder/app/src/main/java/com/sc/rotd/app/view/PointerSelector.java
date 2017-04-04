package com.sc.rotd.app.view;

import android.app.Activity;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import com.sc.rotd.app.R;
import com.sc.rotd.app.utils.CommonAndroidUtils;

import java.util.ArrayList;
import java.util.List;

public class PointerSelector {

    public static int SELECTED_BACKGROUND_COLOR = 0;
    public static int NOT_SELECTED_BACKGROUND_COLOR = 0;
    public static final int POINTER_WIDTH_DP = 5;
    public static final int POINTER_SPLIT_WIDTH = 2;
    private Activity activity;
    private ViewGroup page_pointer_layout;
    private List<View> pointerViews;

    public PointerSelector(Activity activity, int pointerViewGroupId) {
        this.activity = activity;
        SELECTED_BACKGROUND_COLOR = activity.getResources().getColor(R.color.pointer_on);
        NOT_SELECTED_BACKGROUND_COLOR = activity.getResources().getColor(R.color.pointer_off);
        page_pointer_layout = (ViewGroup) activity.findViewById(pointerViewGroupId);
    }

    public void addDefaultPointers(int ayaDetailSize) {
        if (ayaDetailSize < 1) {
            return;
        }
        if (pointerViews == null) {
            pointerViews = new ArrayList<View>();
            DisplayMetrics displayMetrics = activity.getResources().getDisplayMetrics();
            int screenWidthPixels = displayMetrics.widthPixels;

            int viewsHeight = CommonAndroidUtils.convertDip(displayMetrics, POINTER_WIDTH_DP);
            int splitWidth = CommonAndroidUtils.convertDip(displayMetrics, POINTER_SPLIT_WIDTH);

            int pointerWidth = (screenWidthPixels / ayaDetailSize) - splitWidth;

            LinearLayout.LayoutParams pointerLayoutParams = new LinearLayout.LayoutParams(pointerWidth, viewsHeight);
            LinearLayout.LayoutParams splitLayoutParams = new LinearLayout.LayoutParams(splitWidth, viewsHeight);
            LinearLayout.LayoutParams outerLayoutParams = new LinearLayout.LayoutParams(splitWidth / 2, viewsHeight);

            page_pointer_layout.addView(new View(activity), outerLayoutParams);
            for (int i = 0; i < ayaDetailSize; i++) {

                View pointerView = new View(activity);
                pointerViews.add(pointerView);
                //pointerView.setTag(i);
                page_pointer_layout.addView(pointerView, pointerLayoutParams);
                pointerView.setBackgroundColor(NOT_SELECTED_BACKGROUND_COLOR);
                if (i < ayaDetailSize - 1) {
                    page_pointer_layout.addView(new View(activity), splitLayoutParams);
                } else {
                    page_pointer_layout.addView(new View(activity), outerLayoutParams);
                }
            }
            this.select(0, true);
        }

    }

    public void select(int index, boolean on) {
        if (pointerViews == null || pointerViews.size() < index + 1) {
            return;
        }
        View pointer = pointerViews.get(index);
        if (pointer != null) {
            if (on) {
                pointer.setBackgroundColor(SELECTED_BACKGROUND_COLOR);
            } else {
                pointer.setBackgroundColor(NOT_SELECTED_BACKGROUND_COLOR);
            }
        }
    }

    public void selectOne(int index) {
        if (pointerViews == null || pointerViews.size() < index + 1) {
            return;
        }
        for (int i = 0; i < pointerViews.size(); i++) {
            View pointer = pointerViews.get(i);
            if (pointer != null) {
                if (i == index) {
                    pointer.setBackgroundColor(SELECTED_BACKGROUND_COLOR);
                } else {
                    pointer.setBackgroundColor(NOT_SELECTED_BACKGROUND_COLOR);
                }
            }
        }
    }

}
