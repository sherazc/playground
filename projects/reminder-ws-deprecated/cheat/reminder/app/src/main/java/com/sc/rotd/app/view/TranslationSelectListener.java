package com.sc.rotd.app.view;

import android.view.View;
import android.widget.TextView;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.api.service.SearchService;
import com.sc.rotd.api.utils.CommonUtils;
import com.sc.rotd.app.R;
import com.sc.rotd.app.ReminderActivity;
import com.sc.rotd.app.persistence.SharedPreferencesManager;
import com.sc.rotd.app.service.SearchServiceAndroid;

import java.util.List;

public class TranslationSelectListener implements View.OnClickListener {

    private ReminderActivity reminderActivity;
    private String translationName;
    private TranslationDialogFragment translationDialogFragment;

    public TranslationSelectListener(TranslationDialogFragment translationDialogFragment, String translationName) {
        this.reminderActivity = (ReminderActivity) translationDialogFragment.getActivity();
        this.translationName = translationName;
        this.translationDialogFragment = translationDialogFragment;
    }

    @Override
    public void onClick(View view) {
        List<AyaDetail> activityAyaDetails = reminderActivity.getAyaDetails();
        SearchService searchService = SearchServiceAndroid.buildSearchService(reminderActivity,
                translationName);
        SharedPreferencesManager sharedPreferencesManager = reminderActivity.getSharedPreferencesManager();
        sharedPreferencesManager.saveStringValue(TranslationViewArrayAdapter.TRANSLATION_DISPLAY_NAME_PREFERENCE,
                translationName);

        List<AyaDetail> ayaDetails = searchService.updateTranslation(activityAyaDetails);
        TextView selectedTranslation = (TextView) reminderActivity.findViewById(R.id.app_bar_selected_translation);
        selectedTranslation.setText(translationName);
        reminderActivity.refreshAyaDetails(ayaDetails);
        translationDialogFragment.dismiss();
    }
}
