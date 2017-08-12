package com.sc.rotd.app;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.api.domain.enums.SuraName;

import java.util.Date;

public class ChapterNameFragment extends Fragment {

    public static final String CHAPTER_NAME_FRAGMENT_NAME = "chapter_name_fragment";

    private AyaDetail ayaDetail;

    public static ChapterNameFragment newInstance(AyaDetail ayaDetail) {
        ChapterNameFragment fragment = new ChapterNameFragment();
        fragment.setAyaDetail(ayaDetail);
        return fragment;
    }

    public ChapterNameFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View fragmentView = inflater.inflate(R.layout.chapter_name_fragment, container, false);

        if (getAyaDetail() != null) {
            TextView header_sura_name_english = (TextView) fragmentView.findViewById(R.id.header_sura_name_english);
            TextView header_sura_name_arabic = (TextView) fragmentView.findViewById(R.id.header_sura_name_arabic);
            TextView header_sura_name_description = (TextView) fragmentView.findViewById(R.id.header_sura_name_description);
            TextView reminder_date = (TextView) fragmentView.findViewById(R.id.reminder_date);

            SuraName suraName = getAyaDetail().getFirstAyaSuraName();
            header_sura_name_english.setText(suraName.getEnglish());
            header_sura_name_arabic.setText(suraName.getArabic());
            String suraDescription = suraName.getDescription() + " - Sura: " + suraName.getSuraNumber();
            header_sura_name_description.setText(suraDescription);
            reminder_date.setText(getAyaDetail().getDisplayDate());
        }
        return fragmentView;
    }

    public void setAyaDetail(AyaDetail ayaDetail) {
        this.ayaDetail = ayaDetail;
    }

    public AyaDetail getAyaDetail() {
        return ayaDetail;
    }

}
