package com.sc.rotd.app.view;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.api.domain.Line;
import com.sc.rotd.app.R;
import com.sc.rotd.app.ReminderActivity;
import com.sc.rotd.app.persistence.SharedPreferencesManager;
import com.sc.rotd.app.utils.CommonAndroidUtils;

public class AyaListArrayAdapter extends ArrayAdapter<String> {
    private ReminderActivity reminderActivity;
    private AyaDetail ayaDetail;
    private SharedPreferencesManager sharedPreferencesManager;

    public AyaListArrayAdapter(ReminderActivity reminderActivity, AyaDetail ayaDetail) {
        super(reminderActivity, R.layout.single_aya_row);
        this.reminderActivity = reminderActivity;
        this.ayaDetail = ayaDetail;
        sharedPreferencesManager = reminderActivity.getSharedPreferencesManager();
    }

    @Override
    public int getCount() {
        int result = 0;
        if (ayaDetail != null && ayaDetail.getAyas() != null) {
            result = ayaDetail.getAyas().size() + 2;
        }
        return result;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        LayoutInflater layoutInflater = (LayoutInflater) reminderActivity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View singleRow = null;
        if (position == 0) {
            singleRow = layoutInflater.inflate(R.layout.single_aya_row_first, parent, false);
        } else if (position == getCount() - 1) {
            singleRow = layoutInflater.inflate(R.layout.single_aya_row_last, parent, false);
        } else {
            if (convertView != null && convertView.getId() == R.id.single_aya_row) {
                singleRow = convertView;
            } else {
                singleRow = layoutInflater.inflate(R.layout.single_aya_row, parent, false);
            }
            populateSingleRowView(position, singleRow);
        }
        return singleRow;
    }

    private void populateSingleRowView(int position, View singleRow) {
        TextView single_aya_row_aya_number = (TextView) singleRow.findViewById(R.id.single_aya_row_aya_number);
        TextView single_aya_row_aya = (TextView) singleRow.findViewById(R.id.single_aya_row_aya);
        CustomTextView single_aya_row_aya_translation = (CustomTextView) singleRow.findViewById(R.id.single_aya_row_aya_translation);

        int oneLessPosition = position - 1;

        if (ayaDetail.getAyas() != null && ayaDetail.getAyas().size() > 0
                && oneLessPosition < ayaDetail.getAyas().size()) {
            Line ayaLine = ayaDetail.getAyas().get(oneLessPosition);
            single_aya_row_aya_number.setText("\uFD3E" + ayaLine.getAyaNumber() + "\uFD3F");
            single_aya_row_aya.setText(ayaLine.getLineString());
        }

        if (ayaDetail.getTranslations() != null && ayaDetail.getTranslations().size() > 0
                && oneLessPosition < ayaDetail.getAyas().size()) {
            Line translationLine = ayaDetail.getTranslations().get(oneLessPosition);
            single_aya_row_aya_translation.setText(translationLine.getLineString());
        }

        single_aya_row_aya_translation.setFont(translationFontName());
    }

    private String translationFontName() {
        String translationName = CommonAndroidUtils.translationNameFromSPM(sharedPreferencesManager);
        String fontName = null;
        if (translationName.startsWith("Urdu") || translationName.startsWith("Persian")) {
            fontName = "saleem.ttf";
        }
        return fontName;
    }
}