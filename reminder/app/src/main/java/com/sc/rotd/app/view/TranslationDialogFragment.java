package com.sc.rotd.app.view;

import android.content.res.Configuration;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.ListView;
import com.sc.rotd.app.R;
import com.sc.rotd.app.utils.CommonAndroidUtils;

public class TranslationDialogFragment extends DialogFragment {
    private static TranslationDialogFragment translationDialogFragment;
    public static String ID = "Translation Dialog Unique ID";


    public static TranslationDialogFragment newInstance() {
        if (translationDialogFragment == null) {
            translationDialogFragment = new TranslationDialogFragment();
        }
        return translationDialogFragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setStyle(DialogFragment.STYLE_NO_TITLE, android.R.style.Theme_Holo_Light_Dialog);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View translationDialogFragment = inflater.inflate(R.layout.translation_dialog_fragment, container, false);
        ListView translationListSelect = (ListView) translationDialogFragment.findViewById(R.id.translation_list_select);
        String[] translationNames = this.getResources().getStringArray(R.array.language_array);
        TranslationViewArrayAdapter translationViewArrayAdapter = new TranslationViewArrayAdapter(this, translationNames);

        translationListSelect.setAdapter(translationViewArrayAdapter);

        LinearLayout translationViewDialog = (LinearLayout) translationDialogFragment.findViewById(R.id.translation_view_dialog);
        int orientation = getResources().getConfiguration().orientation;
        DisplayMetrics displayMetrics = getResources().getDisplayMetrics();
        if (orientation == Configuration.ORIENTATION_LANDSCAPE) {
            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                    CommonAndroidUtils.convertDip(displayMetrics, 400),
                    CommonAndroidUtils.convertDip(displayMetrics, 300));
            translationViewDialog.setLayoutParams(layoutParams);
        } else {
            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                    CommonAndroidUtils.convertDip(displayMetrics, 300),
                    CommonAndroidUtils.convertDip(displayMetrics, 400));
            translationViewDialog.setLayoutParams(layoutParams);
        }
        return translationDialogFragment;
    }
}
